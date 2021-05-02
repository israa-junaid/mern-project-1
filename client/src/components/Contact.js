import React,{ useEffect,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
const Contact = () => {
    
    const [userData,setUserData] = useState({ name:"", email:"", phone:"", message:"" });
    
    const callContactPage = async() => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                },
        
            });
            const data = await res.json ();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
            
            if(!res.status === 200){
                const error= new Error(res.error)
                throw error;
            }

        } catch (err) {
           // console.log(err);
            //history.push('/login')

        }

    }

    useEffect(() => {
        callContactPage();
    }, [])

    //Storing data in usestates
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({...userData, [name]:value});
    }

    //sending data to backend
    const contactForm = async(e) => {
        e.preventDefault();
        const {name,email,phone,message} = userData;
        const res = await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":" application/json"
            },
            body:JSON.stringify({
                name,email, phone,message
            })
        });
        const data = await res.json();

        if(!data) {
            console.log("message not sent");
        } else {
            alert("Message Sent");
            setUserData({...userData,message:""});
        }
    }

    return (
        <>

            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                                {/* phone no */}
                                <div className="contact_info_item d-flex justify-content-start align-items-center">  
                                <i class="fas fa-phone-square-alt"></i>
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">
                                            Phone
                                        </div>                      
                                        <div className="contact_info_text">
                                            +333 2284 26888
                                        </div>
                                    </div>
                                    
                                </div>
                                 {/* email*/}
                                 <div className="contact_info_item d-flex justify-content-start align-items-center">  
                                 <i class="fas fa-envelope"></i>
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">
                                            Email
                                        </div>                      
                                        <div className="contact_info_text">
                                            israa.junaid@gmail.com
                                        </div>
                                    </div>
                                    
                                </div>
                                 {/* address */}
                                 <div className="contact_info_item d-flex justify-content-start align-items-center">  
                                 <i class="fas fa-map-marked"></i>
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">
                                            Address
                                        </div>                      
                                        <div className="contact_info_text">
                                            Malir cannt karachi
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            

            {/* contact us form  */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                            <div className="contact_form_title">
                                <h2>Get In Touch</h2> <br/> 
                            </div>
                            <form method="POST" id="contact_form">
                                <div className="contact_form_inputs d-flex flex-md-row justify-content-between align-items-between " >
                                    <input type="text" id="contact_form_name" className="contact_form_name input_field" placeholder="Your name" 
                                     name="name"
                                    value={userData.name}   onChange={handleInputs} required="true"/>
                                    <input type="email" id="contact_form_email" className="contact_form_email input_field" placeholder="Your Email" 
                                     name="email"
                                    value={userData.email}  onChange={handleInputs} required="true"/>
                                    <input type="number" id="contact_form_phone" className="contact_form_phone input_field" placeholder="Your Phone"  
                                     name="phone"
                                    value={userData.phone}  onChange={handleInputs} required="true"/>
                                </div>
                                <div className="contact_form_text mt-5">
                                    <textarea class="form-control" aria-label="Message" placeholder="Message" name="message"  value={userData.message} onChange={handleInputs} ></textarea><br/>
                                    {/* <textarea className="text_field contact_form_message" id="" cols="30" rows="10" placeholder="Message" ></textarea> */}
                                </div>
                                 <div className="contact-form_button">
                                     <button type="submit" class="btn btn-primary" onClick={contactForm} >Send Message</button>
                                     {/* <button type="submit"className="button contact_submit_button" >Send Message</button> */}
                                 </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>












        </>

    )
}

export default Contact
