import React,{ useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory} from "react-router-dom";
import "./Signup.css"
const Signup = () => {
  const history = useHistory();
  const[user,setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  });

let name, value;
const handleInputs =(e) =>{
    console.log(e);
    name=e.target.name;
    value=e.target.value;

    setUser({...user,[name]:value});

}

const postData = async(e) => {
    e.preventDefault();
    const{name, email, phone, work, password, cpassword} = user

    const res = await fetch("/register",{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });
    const data = await res.json();
    if(res.status=== 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration")
    } else {
      window.alert(" Registration DONE");
      console.log(" Registration DONE");

      history.push('/login');
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
            <h5 className="card-title text-center">Signup Form</h5>
            <form method="POST" className="form-signin">
              <div className="form-label-group">
                <input type="text" id="inputUserame" className="form-control"  
                value={user.name} onChange={handleInputs} placeholder="Username" name="name"  required autofocus />
                <label htmlFor="inputUserame">Username</label>
              </div>

              <div className="form-label-group">
                <input type="email" id="inputEmail" className="form-control"  
                value={user.email} onChange={handleInputs} placeholder="Email address" name="email"  required />
                <label for="inputEmail">Email address</label>
              </div>
              
              <div className="form-label-group">
                <input type="number" id="inputPhone" className="form-control"  
                value={user.phone} onChange={handleInputs} placeholder="phone No" name="phone"  required />
                <label for="inputPhone">Phone No</label>
              </div>

              
              <div className="form-label-group">
                <input type="text" id="work" className="form-control" 
                value={user.work} onChange={handleInputs} placeholder="Your Profession" name="work"  required />
                <label for="work">Your Profession</label>
              </div>

              <div className="form-label-group">
                <input type="password" id="inputPassword" name="password" className="form-control" 
                value={user.password} onChange={handleInputs}  placeholder="Password" required />
                <label htmlFor="inputPassword">Password</label>
              </div>
              
              <div className="form-label-group">
                <input type="password" name="cpassword" id="inputConfirmPassword" className="form-control" 
                value={user.cpassword} onChange={handleInputs}  placeholder="Password" required />
                <label htmlFor="inputConfirmPassword">Confirm password</label>
              </div>

              <div className="form-group form-button">
                <input type="submit" name='Signup' id="signup" className="form-submit" value="register" onClick={postData} />
 
              </div>
              {/* <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" name="signup" >Register</button> */}
             
              <a class="d-block text-center mt-2 small" href="#">I am already register</a>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

      </>

    
    )
}

export default Signup
