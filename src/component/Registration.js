import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import Resizer from 'react-image-file-resizer';
import shortid from 'shortid';
import database from './firebase';
import { useParams } from "react-router-dom";
import { Load_AreaData, Load_StateData, Load_CityData, Load_ShopeData } from '../redux/action';
import MemberDashboard from '../Dashboard/MemberDashboard';
import AdminDashboard from '../Dashboard/AdminDashboard';
const initData = {
  user_mobile: "",
  shope_type: "",
  shop_name: "",
  state_name: "",
  area_name: "",
  city_name: "",
  shopaddress: "",
  shopareapincode: "",
  Registration_id: "",
  registrationBy: "",
  password: ""
}
const initImgData = {
  imgid: "",
  imgdata: ""
}
let loadImg = 0;
let areaDataArray = [];
let cityDataArray = [];
let State;
let City;
let Area;
let Mobile;
const Registration = () => {
  const [state, setState] = useState(initData);
  const [stateImg, setStateImg] = useState(initImgData);
  let Data_id = useParams();
  const { Loadstate, Ownervar, Loadimage, LoginMemberData, loginUser,  Loadshope, Loadarea, Loadcity } = useSelector(state => state.cartreducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Load_CityData());
    dispatch(Load_AreaData());
    dispatch(Load_StateData());
    dispatch(Load_ShopeData());
    Object.keys(Ownervar).map((id, index) => {
      Object.keys(Loadimage).map((id1, index) => {
        Object.keys(Loadimage[id1]).map((id2, index) => {
          if (Data_id.id === id) {
            setState({ ...Ownervar[id] });
            State = Ownervar[id].state_name
            City = Ownervar[id].city_name
            Area = Ownervar[id].area_name
            Mobile = Ownervar[id].user_mobile
          }
          if (Data_id.imgid === id2) {
            setStateImg({ ...(Loadimage[id1])[id2] });
          }
          // console.log("anil image", stateImg)
        });
      })
    })
  }, [dispatch])
  const { state_name, user_mobile, shop_name, shope_type, area_name, city_name, shopaddress, shopareapincode } = state;
  // console.log("data is ",Data_id.id)
  // console.log("img is ",Data_id.imgid)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let stnm = state.state_name
    let ctnm = state.city_name
    let arnm = state.area_name
    let mob = state.user_mobile

    // current date function
    const curryear = new Date().getFullYear();
    const currmonth = new Date().getMonth() + 1;
    const currday = new Date().getDate();
    let date = `${currday}-${currmonth}-${curryear}`

    // current time function
    const current = new Date();
    const Time = current.toLocaleTimeString();

    if (Data_id.id) {
      state.Data_update_date = date;
      state.Data_update_time = Time;
      database.ref(`registration_user/${stnm}/${ctnm}/${arnm}/user_reg/${Data_id.id}`).set(state, (err) => {
        if (err) {
          alert("data not updated");
        } else {
          database.ref(`registration_user/${stnm}/${ctnm}/${arnm}/user_regis_img/${mob}/${Data_id.imgid}`).set(stateImg);
          alert("data updated");
        }
        if (State !== stnm || City !== ctnm || Area !== arnm || Mobile !== mob) {
          database.ref(`registration_user/${State}/${City}/${Area}/user_reg/${Data_id.id}`).remove();
          database.ref(`registration_user/${State}/${City}/${Area}/user_regis_img/${Mobile}/${Data_id.imgid}`).remove();
        }
      })
    }
    else {
      const regisid = shortid.generate();
      state.Registration_id = regisid;
      stateImg.imgid = regisid;
      state.password = regisid;
      state.registrationBy = loginUser.Name;

console.log("loginUser.Name.........",loginUser.Name);
      state.currentDate = date;
      state.currentTime = Time;
      console.log("loginUser------", loginUser);
      console.log("state------", state);
      database.ref(`registration_user/${stnm}/${ctnm}/${arnm}/user_reg`).push(state, (err) => {
        if (err) {
          alert("user not registered");
        } else {
          database.ref(`registration_user/${stnm}/${ctnm}/${arnm}/user_regis_img/${mob}`).push(stateImg);
          alert("Your Registration is successful your password is " + regisid);
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
            stateImg.imgdata = uri;
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
  cityDataArray = [];
  Object.keys(Loadcity).map((id, index) => {
    if (state.state_name === Loadcity[id].state_name) {
      cityDataArray.push(Loadcity[id].city_name);
    }
  });
  areaDataArray = [];
  Object.keys(Loadarea).map((id, index) => {
    if (state.city_name === Loadarea[id].city_name) {
      areaDataArray.push(Loadarea[id].area_name)
    }
  });
  // console.log("area regis details...",Loadarea);
  return (
    <>
       {/* <AdminDashboard/> */}
       <MemberDashboard/>
   
      <div className='container mt-4'>
        <form className='container border border-black col-sm-4 mt-4 mb-3 shadow'
          onSubmit={handleSubmit}>
          <h1 className='text-center text-danger'>Registration</h1>
          <div>
            <h5 className='text-danger'>Mobile Number</h5>
            <input
              type="text"
              name="user_mobile"
              className="form-control mb-2 mt-3"
              value={user_mobile || ""}
              onChange={handleChange} />
            <h5 className='text-danger mt-3'>Shop Name</h5>
            <input
              type="text"
              name="shop_name"
              value={shop_name || ""}
              className="form-control mb-2"
              onChange={handleChange} />
            <h5 className='mt-2 mb-2 text-danger'>Shoplogo</h5>
            <input
              type="file"
              name="imgdata"
              className='mb-3'
              onChange={imageLoad}
            />
            <h5 className='text-danger'>shope Type</h5>
            <select
              name="shope_type"
              className="form-control mt-3 mb-3"
              value={shope_type || ""}
              onChange={handleChange}>
              <option>select shope type name</option>
              {
                Object.keys(Loadshope).map((id, index) => {
                  return (
                    <option>{Loadshope[id].shope_type}</option>
                  )
                }
                )}
            </select>
            <h5 className='text-danger'>State Name</h5>
            <select
              name="state_name"
              className="form-control mt-3 mb-3"
              value={state_name || ""}
              onChange={handleChange}>
              <option>select state name</option>
              {
                Object.keys(Loadstate).map((id, index) => {
                  return (
                    <option>{Loadstate[id].state_name}</option>
                  )
                }
                )}
            </select>
            <h5 className='text-danger'>City Name</h5>
            <select
              name="city_name"
              value={city_name || ""}
              className="form-control mt-3 mb-3"
              onChange={handleChange}>
              <option>select city name</option>
              {
                Object.keys(cityDataArray).map((id, index) => {
                  return (
                    <option>{cityDataArray[id]}</option>
                  )
                }
                )}
            </select>
            <h5 className='text-danger'>Area Name</h5>
            <select
              name="area_name"
              value={area_name || ""}
              className="form-control mt-3 mb-3"
              onChange={handleChange}>
              <option>select area name</option>
              {
                Object.keys(areaDataArray).map((id, index) => {
                  return (
                    <option>{areaDataArray[id]}</option>
                  )
                }
                )}
            </select>
            <h5 className='text-danger'>shopaddress</h5>
            <input
              type="text"
              name="shopaddress"
              value={shopaddress || ""}
              placeholder='enter shopaddress....'
              className="form-control mb-2"
              onChange={handleChange} />
            <h5 className='text-danger'>Shop Area Pincode</h5>
            <input
              type="text"
              name="shopareapincode"
              value={shopareapincode || ""}
              className="form-control mb-2"
              onChange={handleChange} />
          </div>
          <div className="container text-center">
            <Button
              type="submit"
              className="btn btn-success text mb-3 form-control"
            >
              {Data_id.id ? "Update" : "register"}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Registration;