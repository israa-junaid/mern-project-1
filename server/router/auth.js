const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

const cookieParser = require("cookie-parser");
router.use(cookieParser());
require('../db/conn');
const User = require("../models/userSchema");
const { JsonWebTokenError } = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send(`Hello world from the server app.js Router`);
});

router.post('/register', async (req, res) => {
    
    const {name, email,work,phone,password,cpassword} = req.body;
    console.log(email);
    
    //checking if all feilds are filled or not 
    if (!name || !email || !work || !phone || !password  || !cpassword)
    {
        return res.status(422).json({error:"Fill All Fields"});
    }
   //res.json({message:req.body});
   
   //user REgisteration
        try {
           const userExist =  await User.findOne({email: email});

           if(userExist) {
               return res.status(422).json({error: "Email already exist"});
           } else if (password != cpassword) {
            return res.status(422).json({error: "passwords does not match "});
           } else {
            const user = new User({name, email, phone, work, password, cpassword});

             await user.save();
             res.status(201).json({message:"User Registered Successfuly"});
           }
        }catch (err) {
            console.log(err);
        }
});

//user login 
router.post('/signin', async(req, res) => {
    try {
        
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please fill the fields"});
        }

        const userLogin = await User.findOne({email:email});
        //console.log(userLogin);
        if (userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);//pasword = user typing the pasword in login form, userLogin.password = db mein stored pw uss email ka 
            
            const token = await userLogin.generateAuthToken();
            console.log(`Token= ${token}`);

            //cookie mein token save krna
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+2598200000), //expires in 30days
                httpOnly:true
                
            });

            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"});
            }else {
                res.json({message:"User Signin Successfuly !!!"});
            }
        } else {
            res.status(400).json({error:"Invalid Credentials"});
        }
  
    }catch (err){
        console.log(err);
    }
});

//ABout us page
router.get('/about',authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});
//get user data for home and contact page
router.get('/getdata',authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});
//contact us page
router.post('/contact',authenticate, async(req, res) => {
    try {

        const {name,email,phone,message} = req.body;

        if (!name || !email || !phone || !message ){
            console.log("error in contact us page");
            return res.json({error: "Kindlt fill the contact form"});
        }
       
        const userContact = await User.findOne({_id:req.userID});
       
        if(userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({message:"Successfully updated in DB"})
        }
    }catch (err){
        console.log(err);
    }
});
router.get('/logout', (req, res) => {
    console.log(`Logout Page`);
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("USer Logout");
});
module.exports = router;