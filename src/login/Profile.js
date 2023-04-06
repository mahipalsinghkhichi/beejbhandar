import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import database from "../component/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Load_AreaData, Load_CityData, Load_StateData } from "../redux/action";
const initialdata = {
    userName: "",
    contact: "",
    email: "",
    password: "",
    address: "",
    profileid: "",
    state_name: "",
    city_name: "",
    area_name: "",
}
let cityDataArray = [];
let areaDataArray = [];
const Profile = () => {

    const [state, setState] = useState(initialdata);
    const {Loadstate}=useSelector(state=>state.cartreducer);
    const {Loadcity}=useSelector(state=>state.cartreducer);
    const {Loadarea}=useSelector(state=>state.cartreducer);

    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(Load_StateData());
        dispatch(Load_CityData());
        dispatch(Load_AreaData());
    },[dispatch])
// console.log(" state,,city,,,area,,,in profile", Loadstate , Loadcity , Loadarea );

cityDataArray=[];
Object.keys(Loadcity).map((id,index)=>{
    if(state.state_name===Loadcity[id].state_name)
    cityDataArray.push(Loadcity[id].city_name)
    console.log("Loadcity............",state.state_name);
})
areaDataArray=[];
Object.keys(Loadarea).map((id,index)=>{
    if(state.city_name===Loadarea[id].city_name)
    areaDataArray.push(Loadarea[id].area_name)
})

    return (

        <div className="container" style={{ margintop: '180px' }}>
            <form
                className="container border border-danger col-sm-offset-12 col-sm-4 mt-4"
                style={{ backgroundColor: 'steelblue' }}>
                <h1 className="text-center text-white">Profile Update</h1>
                <div>
                    <select
                        className="form-control mb-3"
                        name="state_name">
                        <option>select state name</option>
                        {
                            Object.keys(Loadstate).map((id, index) => {
                                return (
                                    <option>{Loadstate[id].state_name}</option>
                                )
                            })
                        }
                    </select>
                    <select className=" form-control mb-3"
                        name="city_name"
                    >
                        <option> select City name</option>
                        {
                            Object.keys(cityDataArray).map((id, index) => {
                                return (
                                    <option>{cityDataArray[id]}</option>
                                )
                            })
                        }
                    </select>
                    <select className=" form-control mb-3"
                        name="area_name"
                    >
                        <option> select area name</option>
                        {
                            Object.keys(areaDataArray).map((id, index) => {
                                return (
                                    <option>{areaDataArray[id]}</option>
                                )
                            })
                        }
                    </select>
                    <input
                        type="text"
                        name="userNmae"
                        className="form-control mb-3"
                        placeholder='enter the username'
                    />
                    <input
                        type="text"
                        name="contact"
                        className="form-control mb-3"
                        placeholder='enter the contact'
                    />
                    <input
                        type="text"
                        name="email"
                        className="form-control mb-3"
                        placeholder='enter the email'
                    />
                    <input
                        type="text"
                        name="password"
                        className="form-control mb-3"
                        placeholder='enter the password'
                    />

                    <input
                        type="text"
                        name="address"
                        className="form-control mb-3"
                        placeholder='enter the address'
                    />

                </div>
                <div className="container text-center">
                    <Button
                        type="submit"
                        className="btn btn-success text mb-4"
                    >
                        update
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default Profile;