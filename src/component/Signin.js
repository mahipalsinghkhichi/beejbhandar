import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Load_AreaData, Load_StateData, Load_CityData, Admin_Details, Load_MemberRegisData, Loginadmin, Loginmember, Load_Owner } from '../redux/action';
import { Link } from "react-router-dom";
import MemberDashboard from "../Dashboard/MemberDashboard";
import AdminDashboard from "../Dashboard/AdminDashboard";
import ProductReport from "../report/ProductReport";
const initialData = {
  state_name: "",
  city_name: "",
  area_name: "",
  mobile_no: "",
  password: ""
}
let cityDataArray = [];
let areaDataArray = [];
const Signin = () => {
  const [Loginsuccess, setLoginsuccess] = useState(false);
  const [Loginsuccess1, setLoginsuccess1] = useState(false);
  const [Loginsuccess2, setLoginsuccess2] = useState(false);
  const [state, setState] = useState(initialData);

  const { Loadstate, Loadarea, Loadcity, adminData, Loadmemberregis, Ownervar } = useSelector(state => state.cartreducer);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Load_StateData());
    dispatch(Load_CityData());
    dispatch(Load_AreaData());
    dispatch(Admin_Details());
    dispatch(Load_MemberRegisData());

  }, [dispatch])
  //  console.log("adminData.....",adminData.admin_number);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  cityDataArray = [];
  Object.keys(Loadcity).map((id, index) => {
    if (state.state_name === Loadcity[id].state_name)
      cityDataArray.push(Loadcity[id].city_name)
  })

  areaDataArray = [];
  Object.keys(Loadarea).map((id, index) => {
    if (state.city_name === Loadarea[id].city_name) {
      areaDataArray.push(Loadarea[id].area_name)
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    let stnm = state.state_name;
    let ctnm = state.city_name;
    let arnm = state.area_name;
    dispatch(Load_Owner(stnm, ctnm, arnm));
    Object.keys(Ownervar).map((id,index)=>{
      if(state.mobile_no===Ownervar[id].user_mobile & state.password===Ownervar[id].password ){
        // console.log("Ownervar...........",state.mobile_no,"===",Ownervar[id].user_mobile, "&&&", state.password,"===",Ownervar[id].password)
        dispatch(Loginadmin(Ownervar[id]));
        setLoginsuccess1(true);
      }
    })
    Object.keys(adminData).map((id, index) => {
      if (state.mobile_no == adminData[id].admin_number && state.password == adminData[id].password) {
        // console.log("adminData=======",state.mobile_no,"===",adminData[id].admin_number,".........",state.password,"===",adminData[id].password);
        dispatch(Loginadmin(adminData[id]));
        setLoginsuccess(true);
        console.log("login");
      }
    })
    Object.keys(Loadmemberregis).map((id,index)=>{
      if(state.mobile_no== Loadmemberregis[id].mobile_no && state.password==Loadmemberregis[id].password){
        dispatch(Loginadmin(Loadmemberregis[id]));
        setLoginsuccess2(true);
        console.log("login");
      }
    })

  }

  if (Loginsuccess) {
    return <AdminDashboard />
  }
  else if(Loginsuccess1) {
    return <ProductReport />
  }
  else if(Loginsuccess2){
    return<MemberDashboard/>
  }
  else {
    return (
      <>{
        <div className="container"
          style={{ marginTop: "170px" }}>

          <form className="container border border-dark
                   col-sm-offset-3  col-sm-4  mt-4"
            onSubmit={handleSubmit}
            style={{ backgroundColor: "black" }}>
            <h2 className="text-danger text-center">
              Sign in
            </h2>
            <div className="container">
              <select
                name="state_name"
                onChange={handleChange}
                className="form-control mt-3 mb-3">
                <option>select state name</option>
                {
                  Object.keys(Loadstate).map((id, index) => {
                    return (
                      <option>{Loadstate[id].state_name}</option>
                    )
                  }
                  )}
              </select>
              <select
                name="city_name"
                onChange={handleChange}
                className="form-control mt-3 mb-3">
                <option>select city name</option>
                {
                  Object.keys(cityDataArray).map((id, index) => {
                    return (
                      <option>{cityDataArray[id]}</option>
                    )
                  }
                  )}
              </select>
              <select
                name="area_name"
                onChange={handleChange}

                className="form-control mt-3 mb-3">
                <option>select area name</option>
                {
                  Object.keys(areaDataArray).map((id, index) => {
                    return (
                      <option>{areaDataArray[id]}</option>
                    )
                  }
                  )}
              </select>
            </div>
            <div className="container mb-3">
              <input
                type="text"
                onChange={handleChange}

                name="mobile_no"
                className="form-control mt-3"
                placeholder="enter mobile number"
              />
              <input
                type="text"
                name="password"
                onChange={handleChange}

                className="form-control mt-3"
                placeholder="enter password"
              />
            </div>
            <div className="container text-center">
              <Button
                type="submit"
                className="btn btn-warning mb-4"
              >
                Login
              </Button>
              
            </div>
            <Link to="/MemberLogin">
              <h6 className="text-white"
                style={{ textAlign: "right" }}>register</h6>
            </Link>

          </form>
        </div>

      }
      </>
    );
  }
}
export default Signin;
