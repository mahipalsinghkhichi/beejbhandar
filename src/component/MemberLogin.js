import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Load_MemberRegisData, Loginadmin, Loginmember } from '../redux/action';
import { Link, Router } from 'react-router-dom';
import database from './firebase';
import Registration from './Registration';
import AdminDashboard from '../Dashboard/AdminDashboard';

const initialData = {
    mobile_no: "",
    password: ""
}
const MemberLogin = () => {

    const [Loginsuccess, setLoginsuccess] = useState(false);
    const [state, setState] = useState(initialData);
    const { Loadmemberregis } = useSelector(state => state.cartreducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Load_MemberRegisData());
    }, [dispatch])
    console.log("member regis table Data-----", Loadmemberregis);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const handleSubmit = (e) => {
        Object.keys(Loadmemberregis).map((id, index) => {
            if (state.mobile_no === Loadmemberregis[id].mobile_no & state.password === Loadmemberregis[id].password) {
                dispatch(Loginadmin(Loadmemberregis[id]));
                setLoginsuccess(true);
                console.log("login")
            }

        })
   
    }
    
    return (
        <> 
        <AdminDashboard/>
            {
                Loginsuccess ? <><Registration /></> : <>
                    <div className='container '
                        style={{ marginTop: "170px" }}>
                        <form className='container border border-dark
                            col-sm-offset-3 col-sm-4 mt-3'
                            style={{ backgroundColor: "black" }}
                            onSubmit={handleSubmit}>
                            <div className='text-center'>
                                <img
                                    className='rounded-circle  border-light m-2'
                                    src="unsplash.jpg"
                                    style={{
                                        height: "80px",
                                        width: "80px",
                                        borderRadius: "30px"
                                    }}
                                />
                            </div>
                            <h2 className='text-success text-center'>
                                MemberLogin
                            </h2>
                            <div className='container mb-3'>
                                <input
                                    type="tel"
                                    min={10}
                                    max={10}
                                    name="mobile_no"
                                    className="form-control mb-3"
                                    placeholder="enter mobile number"
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control mb-3"
                                    placeholder="enter password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='container text-center'>
                                <Button
                                    type='submit'
                                    className='btn-info mb-3'
                                >
                                    Login
                                </Button>
                            </div>
                            {/* <Link to="/Signin"> */}
                            <h6 className="text-danger"
                                style={{ textAlign: "right" }}>Signin</h6>
                            {/* </Link> */}
                        </form>
                    </div>
                </>
            }


        </>
    );
}

export default MemberLogin;