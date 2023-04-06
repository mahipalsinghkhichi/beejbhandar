import React, { useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import shortid from 'shortid';
import database from './firebase';
import { useSelector } from 'react-redux';
import OwnerDashboard from '../Dashboard/ShopekeeperDashboard';
const initialData={
    name : "",
    price : "",
    product_Detail : "",
    photo : "",
    product_id : ""
  }
  let loadImg = 0;
const ProductName = () => {
    const[state,setState]=useState(initialData);
    const  matchid  = useParams();
const {Loadproduct, loginUser} =useSelector(state=>state.cartreducer);
console.log("loginUser....",loginUser.user_mobile);

useEffect(()=>{
  Object.keys(Loadproduct).map((id,index)=>{
    if(matchid.id===id){
      setState({...Loadproduct[id]});
    }
  })
},[matchid,Loadproduct])



const { name,product_id,price,product_Detail} = state;

const handleChange=(e)=>{
  const {name,value}=e.target;
  setState({...state,[name]:value});
}

const handleSubmit=(e)=>{
  e.preventDefault();
  // let mob=loginUser.user_mobile;
  console.log("loginUser.user_mobile.....",loginUser.user_mobile);
  if(matchid.id){
    state.product_id=product_id;
    database.ref(`product_table/${loginUser.user_mobile}/${matchid.id}`).set(state, (err) => {
      if (err) {
        alert("data not updated");
      }
      else {
        alert("data updated");
      }
    });
  }
  else {
    const productid=shortid.generate();
    state.product_id=productid;
  database.ref(`product_table/${loginUser.user_mobile}`).push(state,(err)=>{
    if(err)
    {
      alert("not inserted");
    }
    else
    {
      alert("data inserted");
    }
  })
  }
}
  const imageLoad = (e) => {
    var fileinput = false;
    if (e.target.files[0]) {
      fileinput = true;
    }
    if (fileinput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          300,
          300,
          "jpeg",
          200,
          0,
          (uri) => {
            
            state.photo = uri;
            loadImg = 1;
          },
          "base64",
          300,
          300
        );
      }
      catch (err) {
        console.log("error in imageload section");
      }
    }
  }
  return (
    <>
    <OwnerDashboard/>
    <div className='container mt-4'>
       <form className='container mt-3 col-sm-4 border border-dark shadow'
       style={{backgroundColor:"#0B0B45"}}
       onSubmit={handleSubmit}>
         <h2 className='text-danger text-center'>
              Add Product Name
         </h2>
         <div className='container mb-3'>
         <h5 className='text-danger mt-3'>Name</h5>
             <input
             type="text"
             name="name"
             value={name || ""}
             className='form-control mb-2'
             placeholder='enter product name'
             onChange={handleChange}/>
             <h5 className='text-danger mt-2 mb-2'>Price</h5>
             <input
              type="text"
              name="price"
              value={price || ""}
              className="form-control mb-2"
              placeholder="enter product price"
              onChange={handleChange}
            />
             <h5 className='mt-2 mb-2 text-danger'>Photo</h5>
            <input
              type="file"
              name="photo"
              className='form-control mb-3'
              onChange={imageLoad}
            />
            <h5 className='text-danger'>Product Detail</h5>
             <input
             type="text"
             name="product_Detail"
             value={product_Detail || ""}
             className='form-control mb-2'
             placeholder='enter product details'
             onChange={handleChange}/>
         </div>
         <div className="container text-center">
            <Button
              type="submit"
              className="btn btn-success text mb-3 px-2 form-control"
            >
              save
            </Button>
          </div>
       </form>
    </div>
    </>
  );
}

export default ProductName;