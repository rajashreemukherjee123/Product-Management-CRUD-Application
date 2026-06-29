import React from 'react'
import "./App.css";  
import {Routes, Route, Link} from "react-router-dom";
import SignUp from './pages/SignUp'
import Login from './pages/Login' 
import Product from './pages/Product'
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  return (

    <div style={{
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    paddingBottom: "30px",
    background: "linear-gradient(135deg, #74ebd5, #ACB6E5)"
  }}>
      
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/product" element={
                                        <ProtectedRoute>
                                            <Product/>
                                        </ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
