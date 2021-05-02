import React,{ useState,useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory} from "react-router-dom";
import "./Signup.css";
import { UserContext } from "../App";
const Login = () => {
    const {state,dispatch}= useContext(UserContext);
     const history = useHistory();

    const [email,setEmail] = useState('');
    const [ password,setPassword] = useState('');

 const loginUser = async (e) => {
          e.preventDefault();

          const res = await fetch("/signin",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
            email,password
            })
          });
          const data = await res.json();
          if(res.status=== 400 || !data) {
            window.alert("Invalid Credentials");
            console.log("Invalid Credentials")
          } else {
            dispatch ({type:"USER",payload:true})
            window.alert("Successfully Logged In");
            console.log("Successfully Logged In");
      
            history.push("/");
          }
    }

    return (
        <>
    
  <div className="container">
    <div className="row">
      <div className="col-lg-10 col-xl-9 mx-auto">
        <div className="card card-signin flex-row my-5">
          <div className="card-img-left d-none d-md-flex">
             
          </div>
          <div className="card-body">
            <h5 className="card-title text-center">Log In </h5>
            <form method="POST" className="form-signin">
              
              <div className="form-label-group">
                <input type="email" id="inputEmail" className="form-control"
                 placeholder="Email address"  name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <label for="inputEmail">Email address</label>
              </div>
              
             

              <div className="form-label-group">
                <input type="password" id="inputPassword" name="password"
                 className="form-control" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <label htmlFor="inputPassword">Password</label>
              </div>
              
             
              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" name="signup" onClick={loginUser} >Log In</button>
              
              <a class="small" href="#">Create an Account</a>
             
              
             
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

      </>

    
    )
}

export default Login

