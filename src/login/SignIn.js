import React from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
const SignIn = () => {
  return (
   <>
      <div className='container '
           style={{marginTop:"170px"}}>
          <form className='container border border-danger col-sm-offset-2 col-sm-4 mt-4'
           style={{backgroundColor:"#00ffff"}}
           >
            <div className='text-center'>
              <img className='rounded-circle border-light m-2'
                src="unsplash.jpg"
                style={{
                  height:"80px",
                  width:"80px",
                  borderRadius:"30px"
                }}>
              </img>
            </div>
            <h2 className='text-success text-center'>
              SignIn
            </h2>
            <div className='container mb-3'>
              <input
              type="text"
              name="contact_no"
              className="form-control mb-3"
              placeholder="enter contact number"
              />
            </div>
            <div className='container text-center'>
                <Button
                type='submit'
                className='btn-info mb-3'
                >
                  SignIn
                </Button>
            </div>
            <Link to="/SignUp">
            <label className='text-danger'
              style={{ textAlign: "right" }}>
              SignUp</label>
           </Link>
           </form>
      </div>
   </>
  );
}

export default SignIn;