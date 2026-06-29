import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Product = () => {
    // show user name --- get local storage
   const username = localStorage.getItem("name") ;

  // product form value---- add value state
  const [productvalue,setProductValue]= useState({
    productName:"", price:"", description:""
  })

  // show product state
  const [showProductValue,setShowProductValue] = useState([]);


  // ------ handle Change --------
  const handleChange = (e)=>{
    setProductValue({...productvalue,[e.target.name]:e.target.value});
  }

  // ----------------------- handle Submit Add Product -----------------
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(productvalue);

    try{
      const token = localStorage.getItem("token");
      let response = await axios.post("http://localhost:3000/api/product/add",productvalue,{
        headers :{
          "content-type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      });
      // console.log(response.data);

      alert(response.data?.message);
      await displayProduct(); ////////////////////
      
      setProductValue({
        _id : "",
      productName:"",
      price:"",
      description:""
      });

    }catch(err){
      console.log(err);
    }

  }

  // -----------------------  Show Product -----------------
  
    const displayProduct = async()=>{
      try{
        let token = localStorage.getItem("token");
        let response = await axios.get("http://localhost:3000/api/product/my_product",{
          headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        
        console.log("Display response:", response.data);
        setShowProductValue([...response.data]);
        
      
      }catch(err){
        console.log("Display error:", err.response?.data);
        if(err.response?.status === 404){
        setShowProductValue([]);
    }
      }
    }
    useEffect(()=>{
    displayProduct();
  },[]);

// -----------------------  Update Product -----------------
 
const [isUpdate,setIsUpdate] = useState(false);

// product show on form
const brforeUpdate = (item)=>{
    setProductValue({
      _id : item._id,
      productName:item.productName,
      price:item.price,
      description:item.description
    })
    setIsUpdate(true);
  }

  // final update 
  const handleUpdate = async()=>{
    try{
      const token = localStorage.getItem("token");
      let response = await axios.put("http://localhost:3000/api/product/update/"+productvalue._id,
        {
          productName : productvalue.productName,
          price : productvalue.price,
          description : productvalue.description
        },{
          headers : {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      alert(response.data?.message);

      await displayProduct();
      setIsUpdate(false);
      setProductValue({
      productName:"",
      price:"",
      description:""
      });

    }catch(err){
      console.log(err);
    }
  }

// -----------------------  Delete Product -----------------

const handleDelete = async(id)=>{
  try{
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No Token , login again");
      return;
    }
    console.log("Token:", token);   
    console.log("Delete ID:", id); 
    
    let response = await axios.delete("http://localhost:3000/api/product/delete/"+ id,
      {
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      }
    );
    console.log("response.data",response.data);
    alert(response.data?.message);

    await displayProduct(); 
   

  }catch(err){
    console.log(err);
  }
}

// --------------------------- Log Out -----------
const handleLogout = ()=>{
  localStorage.clear();
  alert("Logged Out");
  window.location.href = "/signin";
}

  return (
    <div className="container mt-4">

    {/* HEADER */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3>Welcome, <span style={{ color: "blue" }}>{username}</span></h3>
      <button className="btn btn-danger px-4" onClick={handleLogout}>
        Logout
      </button>
    </div>

    {/* ADD PRODUCT FORM */}
    <div className="card mb-4">
      <div className="card-header text-center">
        <h5>Add Product</h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-box"></i>
            </span>
            <input
              type="text"
              name="productName"
              value={productvalue.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="form-control"
            />
          </div>

          {/* PRICE */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-currency-rupee"></i>
            </span>
            <input
              type="number"
              name="price"
              value={productvalue.price}
              onChange={handleChange}
              placeholder="Price"
              className="form-control"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-card-text"></i>
            </span>
            <input
              type="text"
              name="description"
              value={productvalue.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-control"
            />
          </div>

          {
            isUpdate ? (
              <button type="button" className="btn btn-warning w-100" onClick={handleUpdate}>
                Update Product
              </button>
            ) : (
              <button className="btn btn-primary w-100">
                Add Product
              </button>
            )
          }

        </form>
      </div>
    </div>

    {/* PRODUCT LIST */}
    {
  showProductValue.length > 0 ? (
    <div className="row">
      {showProductValue.map((item, index) => (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
          <div className="card h-100 shadow-sm product-card">

            <div className="card-body d-flex flex-column">
              <h5 className="fw-bold">{item.productName}</h5>
              <p className="text-muted small flex-grow-1">
                {item.description}
              </p>

              <p className="text-success fw-bold fs-5">
                <i className="bi bi-currency-rupee"></i> {item.price}
              </p>

              <div className="d-flex justify-content-between mt-2">
                <button 
                  className="btn btn-sm btn-warning"
                  onClick={() => brforeUpdate(item)}
                >
                  Edit
                </button>

                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>

            </div>

          </div>
        </div>
      ))}
    </div>
  ) : (
    <h5 className="text-center mt-3 text-muted">No products found</h5>
  )
}

  </div>
  )
}

export default Product