import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import shortid from "shortid";
import database from "../component/firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminDashboard from "../Dashboard/AdminDashboard";
const initialData = {
  state_name: "",
  state_id: ""
}
const StateRegis = () => {
  const [state, setState] = useState(initialData);
  const matchid  = useParams();
  const { Loadstate } = useSelector(state => state.cartreducer);
      
  useEffect(() => {
    Object.keys(Loadstate).map((id, index) => {
      if (matchid.id === id) {
        setState({ ...Loadstate[id] });
      }
    });
  }, [matchid, Loadstate]);
  const { state_name, state_id } = state;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (matchid.id) {
      state. state_id = state_id;
      database.ref(`state_table/${matchid.id}`).set(state, (err) => {
        if (err) {
          alert("State not updated");
        }
        else {
          alert("State is updated");
        }
      })
    }
    else {
      const idData = shortid.generate();
      state.state_id = idData;
      database.ref("state_table").push(state, (err) => {
        if (err) {
          alert("State is not registered");
        }
        else {
          alert("state is registered");
        }
      })
    }
  }
    return (
      <>
      <AdminDashboard/>
        <div className="container"
          style={{ marginTop: "170px" }}>

          <form className="container border border-danger
                   col-sm-offset-3  col-sm-4  mt-4"
            style={{ backgroundColor: "#0B0B45" }}
            onSubmit={handleSubmit}>
            <h2 className="text-danger text-center">
              State Registration
            </h2>
            <div className="container mb-3">
              <input
                type="text"
                name="state_name"
                value={state_name || ""}
                className="form-control"
                placeholder="enter state name"
                onChange={handleChange}
              />

            </div>
            <div className="container text-center">
              <Button
                type="submit"
                className="btn btn-warning mb-4"
              >
                {matchid.id? "update" : "register"}
              </Button>
            </div>
          </form>
        </div>
      </>
    );
}
export default StateRegis;