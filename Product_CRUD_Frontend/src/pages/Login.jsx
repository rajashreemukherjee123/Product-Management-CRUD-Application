import axios from 'axios';
import React, { useState } from 'react'


const BACKEND_URL = "https://product-crud-backend-tphy.onrender.com";

const Login = () => {

  const [loginData,setLoginData] = useState({
    email:"",pass1:""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(loginData);
    setError("");

    if(!loginData.email || !loginData.pass1){
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);

    try{
      let response = await axios.post(`${BACKEND_URL}/api/users/signin`,loginData)
      console.log(response.data);

      if(response.data?.message == 'Login Successfull'){
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user_id",response.data.user._id);
        localStorage.setItem("email",response.data.user.email);
        localStorage.setItem("name",response.data.user.name);

        window.location.href="/product"
      }

    
    }catch(err){
      console.log("Error:", err.response?.data?.message || "Login failed. Please try again.")
    }finally{
      setLoading(false)
    }
  }

  const backSignup = ()=>{
    window.location.href="/signup"
  }

  return (
    <div className="auth-container">

      <div className="card">
        <div className="card-header text-center">
          <h3>Login</h3>
        </div>

        <div className="card-body">

          {/* ERROR */}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input type="email" name="email" placeholder="Enter your email" onChange={handleChange}  className="form-control"  />
            </div>

            {/* PASSWORD */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"  name="pass1"  placeholder="Enter your password"  onChange={handleChange}  className="form-control"  />
            </div>

            <button className="btn btn-success w-100">
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-center mt-3">
              No account?{" "}
              <span 
                onClick={backSignup} 
                style={{cursor:"pointer", color:"#0d6efd"}}
              >
                Sign Up
              </span>
            </p>

          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
