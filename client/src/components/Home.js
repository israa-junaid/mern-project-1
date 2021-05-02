import React,{ useEffect,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
    const [userName,setUserName] = useState('');
    const [show, setShow]= useState(false);

    const userHomePage = async() => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                },
        
            });
            const data = await res.json ();
            console.log(data);
            setUserName(data.name);
            setShow(true);
            
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
                userHomePage();
            }, [])
    return (
        <>
    
        
        <div class="jumbotron jumbotron-fluid">
        
        <h4 className="display-4" className="text-center text-primary" >WELCOME</h4> <br/>
        <div class="container">
           
            <h1 className="text-center">{userName}</h1><br/>
            <h5 className="text-center text-secondary">{show ? 'Happy to see you back' :'We are MERN Developers' }</h5>
        </div>
        </div>
        </>

    )
}

export default Home
