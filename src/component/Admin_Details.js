import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import shortid from "shortid";
import database from "../component/firebase";
const initialData = {
  admin_number:"",
  admin_id:"",
  password:""
}
const Admin_Details = () => {

  const [state, setState] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const adminid = shortid.generate();
    state.admin_id = adminid;
    database.ref("admin_table").push(state, (err) => {
      if (err) {
        alert("not inserted");
      }
      else {
        alert("data inserted");
      }
    })

  }
  return (
    <>
      <div className="container"
        style={{ marginTop: "170px" }}>

        <form className="container border border-dark
                   col-sm-offset-3  col-sm-4  mt-4"
          style={{ backgroundColor: "black" }}
          onSubmit={handleSubmit}>
          <h2 className="text-danger text-center">
            admin detail
          </h2>
          <div className="container mb-3">
            <input
              type="text"
              name="admin_number"
              className="form-control"
              placeholder="enter number"
              onChange={handleChange}
            />

            <input
              type="text"
              name="password"
              className="form-control mt-3"
              placeholder="enter password"
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
export default Admin_Details;