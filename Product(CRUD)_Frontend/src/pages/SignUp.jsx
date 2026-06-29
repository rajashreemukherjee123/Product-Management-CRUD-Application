import axios from 'axios';
import React, { useState } from 'react'


const SignUp = () => {

    const [userSignup,setUserSignup]= useState({
        name:"",email:"",pass1:""
    })

    // for err
    const [err,setErr] = useState("")

    const handleChange = (e)=>{
        setUserSignup({...userSignup,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(userSignup);

        try{
            let response = await axios.post("http://localhost:3000/api/users/signup",userSignup);
            console.log(response.data);

            if(response.data?.message == "One user Signup successfully" ){
                window.location.href = "/signin"
            }

        }catch(err){
            console.log(err.response.data);
            setErr(err.response.data.message);
        }
    }

  return (
    
  <div className="auth-container">

    <div className="card">
      <div className="card-header text-center">
        <h3>Create Account</h3>
      </div>

      <div className="card-body">

        {/* ERROR */}
        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              name="pass1"
              placeholder="Enter your password"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button className="btn btn-success w-100">
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <span 
              onClick={() => window.location.href="/signin"} 
              style={{cursor:"pointer", color:"#0d6efd"}}
            >
              Login
            </span>
          </p>

        </form>

      </div>
    </div>

  </div>
)
}

export default SignUp
