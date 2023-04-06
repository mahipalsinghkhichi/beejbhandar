import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap"; 
import { useParams } from "react-router-dom";
import shortid from "shortid";
import database from "./firebase";
import AdminDashboard from "../Dashboard/AdminDashboard";
const initialData={
  shope_type : "",
  shope_id : ""
}
const ShopeType = () => {
const[state,setState]=useState(initialData);
const { id } = useParams();
const [shopeData, setShopeData] = useState({});

useEffect(() => {
  database.ref("shope_table").on("value", (snapshot) => {
    if (snapshot.val() != null) {
      setShopeData({ ...snapshot.val() });
    }
    else {
      setShopeData({});
    }
  })
}, [id]);



useEffect(() => {
  if (id) {
    setState({ ...shopeData[id] });
  }
  else {
    setState({ ...initialData });
  }
}, [id, shopeData]);
const { shope_type,shope_id } = state;


const handleChange=(e)=>{
  const {name,value}=e.target;
  setState({...state,[name]:value});
}
 
const handleSubmit=(e)=>{
  e.preventDefault();
  if(id)
  {
    updateData();
  }
  else
  {
    datainsert();
  }
}
  
  const updateData = () => {
    state.shope_id=shope_id;
    database.ref(`shope_table/${id}`).set(state, (err) => {
      if (err) {
        alert("data not updated");
      }
      else {
        alert("data updated");
      }
    });
  }
  const datainsert = () => {
    const shopeid=shortid.generate();
    state.shope_id=shopeid;
  database.ref("shope_table").push(state,(err)=>{
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

  return (
    <>
    <AdminDashboard/>
      <div className="container" 
      style={{ marginTop: "170px"}}>

        <form className="container border border-danger
          col-sm-offset-3  col-sm-4  mt-4 shadow"
          style={{ backgroundColor: "#0B0B45" }}
          onSubmit={handleSubmit}>
          <h2 className="text-danger text-center">
            shope type
          </h2>
          <div className="container mb-3">
            <input
              type="text"
              name="shope_type"
              value={shope_type || ""}
              className="form-control"
              placeholder="enter shope type"
              onChange={handleChange}
            />
          </div>
          <div className="container text-center">
            <Button
              type="submit"
              className="btn btn-warning mb-4"
            >
              register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ShopeType;
