import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import shortid from "shortid";
import database from "../component/firebase";
import { useSelector } from 'react-redux';
import AdminDashboard from "../Dashboard/AdminDashboard";
const initialData = {
  city_name: "",
  city_id: "",
  state_name: "",
  state_id: ""
}
const CityRegis = () => {
  const [state, setState] = useState(initialData);
  const {Loadcity,Loadstate} = useSelector(state=> state.cartreducer);
  const  matchid  = useParams();

  useEffect(() => {
    Object.keys(Loadstate).map((id,index)=>{
    if (matchid.id===id) {
      setState({ ...Loadstate[id] });
    }
   })
  }, [matchid, Loadstate]); 
  console.log("Loadstate....",Loadstate);
  useEffect(() => {
    Object.keys(Loadcity).map((id,index)=>{
    if (matchid.id===id) {
      setState({ ...Loadcity[id] });
    }
   })
  }, [matchid, Loadcity]);

  const { city_name,city_id,state_name } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(matchid.id)
    {
      state.city_id=city_id;
      database.ref(`city_table/${matchid}`).set(state, (err) => {
        if (err) {
          alert("data not updated");
        }
        else {
          alert("data updated");
        }
      });
    }
    else
    {
      const cityid=shortid.generate();
      state.city_id=cityid;
    database.ref("city_table").push(state,(err)=>{
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
  if(state.state_name)
  {
    Object.keys(Loadstate).map((id,index)=>{
      if (state.state_name === Loadstate[id].state_name) {
        state.state_id = Loadstate[id].state_id;
      }
      }
    )
  }
  return (
    <>
    <AdminDashboard/>
      <div className="container"
        style={{ marginTop: "170px" }}>

        <form className="container border border-danger
                   col-sm-offset-3  col-sm-4  mt-4"
          style={{ backgroundColor: "beige" }}
          onSubmit={handleSubmit}>
          <h2 className="text-danger text-center">
            City Registration
          </h2>
          <select
            name="state_name"
            value={state_name||""}
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
          <div className="container mb-3">
            <input
              type="text"
              name="city_name"
              value={city_name || ""}
              className="form-control"
              placeholder="enter city name"
              onChange={handleChange}
            />
          </div>
          <div className="container text-center">
            <Button
              type="submit"
              className="btn btn-warning mb-4"
            >
            {matchid.id?"update": "register"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CityRegis;
