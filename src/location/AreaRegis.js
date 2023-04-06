import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import shortid from "shortid";
import { useParams } from "react-router-dom";
import database from "../component/firebase";
import { useSelector } from "react-redux";
import AdminDashboard from "../Dashboard/AdminDashboard";
const initialData = {
  area_name: "",
  area_id: "",
  city_name: "",
  city_id: "",
  state_name: "",
  state_id: "",
  pin_code: ""
}
let cityDataArray = [];
const AreaRegis = () => {

  const [state, setState] = useState(initialData);
  const{Loadstate}=useSelector(state=>state.cartreducer);
  const{Loadcity}=useSelector(state=>state.cartreducer);
  const{Loadarea}=useSelector(state=>state.cartreducer);

  const  matchid  = useParams();
  useEffect(() => {
    Object.keys(Loadarea).map((id, index) => {
      if (matchid.id === id) {
        setState({ ...Loadarea[id] });
      }
    });
  }, [matchid, Loadarea]);
  const { area_name, area_id, state_name, city_name, pin_code } = state;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (matchid.id)
  {
    state.area_id = area_id;
    database.ref(`area_table/${matchid}`).set(state, (err) => {
      if (err) {
        alert("data not updated");
      }
      else {
        alert("data updated");
      }
    });
  }
  else{
    const areaid = shortid.generate();
    state.area_id = areaid;
    database.ref("area_table").push(state, (err) => {
      if (err) {
        alert("not inserted");
      }
      else {
        alert("data inserted");
      }
    })
  }

  }

  cityDataArray = [];
  Object.keys(Loadcity).map((id, index) => {
    if (state.state_name === Loadcity[id].state_name) {
      cityDataArray.push(Loadcity[id].city_name);
    }
  })
  if (state.state_name) {
    Object.keys(Loadstate).map((id, index) => {
      if (state.state_name === Loadstate[id].state_name) {
        state.state_id = Loadstate[id].state_id;
      }
    }
    )
  }
  if (state.city_name) {
    Object.keys(Loadcity).map((id, index) => {
      if (state.city_name === Loadcity[id].city_name) {
        state.city_id = Loadcity[id].city_id;
      }
    }
    )
  }
  return (
    <>
    <AdminDashboard/>
      <div className="container"
        style={{ marginTop: "170px" }}>

        <form className="container border border-dark
                   col-sm-offset-3  col-sm-4  mt-4"
          style={{ backgroundColor: "black" }}
          onSubmit={handleSubmit}>
          <h2 className="text-danger text-center">
            Area Registration
          </h2>
          <div>
          <select
            name="state_name"
            value={state_name || ""}
            className="form-control mt-3 mb-3"
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
          </div>
          <div className="container mb-3">
            <input
              type="text"
              name="area_name"
              value={area_name || ""}
              className="form-control"
              placeholder="enter area name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="pin_code"
              value={pin_code || ""}
              className="form-control mt-3"
              placeholder="enter pin code"
              onChange={handleChange}
            />
          </div>
          <div className="container text-center">
            <Button
              type="submit"
              className="btn btn-warning mb-4"
            >
             {matchid.id?"update":"register"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AreaRegis;