import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import database from '../component/firebase';
import { Link } from 'react-router-dom';
const initialdata = {
    user_name: "",
    user_id: "",
    user_mo: "",
    state_name: "",
    city_name: "",
    area_name: "",
    address: "",
    pincode: "",
    imgData: "",
    email: ""
}

const SignUp = () => {

    const [state, setState] = useState(initialdata);


    const handleChange = (e) => {
        const { name, value } = e.terget;
        setState({ ...state, [name]: value });
    }
    const handleSubmit = (e) => {
        const signUp_id = shortid.generate();
        state.user_id = signUp_id;
        e.preventDefault();
        database.ref("user_table").push(state, (err) => {
            if (err) {
                alert("data is not inserted");
            }
            else {
                alert("data is  inserted");

            }
        })
    }

    return (

        <div className='container'
            style={{ margintop: "170px" }}>
            <form onSubmit={handleSubmit}
                className='container border border-danger col-sm-offset-2 col-sm-4 mt-4'
                style={{ backgroundColor: '#0B0B45' }} 
                >
                <div className='text-center'>
                <img
                    className='rounded-circle  border-light m-2'
                    src="unsplash.jpg"
                    alt="description of image"
                    style={{
                        height: "80px",
                        width: "80px",
                        borderRadius: "30px"
                    }}
                    />
                </div>
                <h3 className='text-center text-warning'>SignUp</h3>
                <div className='container mb-3'>
                    <input className='form-control mb-3'
                        type="text"
                        name="user_name"
                        placeholder='enter the name'
                        onChange={handleChange}
                    />

                    <input className='form-control mb-3'
                        name='user_mo'
                        type="text"
                        placeholder='enter the phoneNo'
                        onChange={handleChange}

                    />
                    <div className='container text-center'>
                        <Button className=' btn btn-success text mb-4'
                            type='submit'>
                            SignUp
                        </Button>
                    </div>
                    <Link to="/SignIn">
                        <label className='text-white' 
                        style={{textAlign:"right"}}>
                        SignIn</label>
                    </Link>
                </div>
            </form >
        </div >

    );
}

export default SignUp;
