import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import database from './firebase';
import shortid from 'shortid';
import AdminDashboard from '../Dashboard/AdminDashboard';
const initialData={
  Name : "",
  Father_name : "",
  mobile_no : "",
  member_id : "",
  Address : "",
  password : ""
}
const MemberRegis = () => {

  const[state,setState]=useState(initialData);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setState ({...state,[name]:value});
  }
  const handleSubmit=(e)=>{
    const memberid = shortid.generate();
    state.member_id=memberid;
    state.password =memberid;
    e.preventDefault();
    database.ref("memberregis_table").push(state,(err)=>{
      if(err){
        alert("not inserted");
      }
      else{
        alert("You have successfully registered  your password is  "+ memberid);
      }
    })
  }

 
  return (
   <>
   {/* <AdminDashboard/> */}
   <div className='container '
      style={{marginTop:"170px"}}>
           <form className='container border border-dark
           col-sm-offset-3 col-sm-4 mt-3'
           style={{backgroundColor:"black"}}
           onSubmit={handleSubmit}>
            <h2 className='text-success text-center'>
              Member Registration
            </h2>
            <div className='container mb-3'>
              <input
              type="text"
              name="Name"
              className="form-control mt-3"
              placeholder="enter full name"
              onChange={handleChange}
              />
              <input
              type="text"
              name="Father_name"
              className="form-control mt-3"
              placeholder="enter father's name"
              onChange={handleChange}
              />
               <input
              type="text"
              name="Address"
              className="form-control mt-3"
              placeholder="enter your address"
              onChange={handleChange}
              />
              <input
              type="text"
              name="mobile_no"
              className="form-control mt-3"
              placeholder="enter mobile number..."
              onChange={handleChange}
              />
            </div>
            <div className='container text-center'>
                <Button
                type='submit'
                className='btn-info mb-3'
            
                >
                  register
                </Button>
            </div>
           </form>
      </div>
   </>
  )
}

export default MemberRegis;