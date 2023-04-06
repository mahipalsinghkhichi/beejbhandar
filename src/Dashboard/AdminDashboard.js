import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../css/component/dashboard.css";
const AdminDashboard = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='mt-2' style={{ height: "80px", backgroundColor: "#0B0B45" }}>
        <img
          className="rounded-circle border border-light m-2"
          src="beejbhandar image.jpeg"
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "30px"
          }}
        />
        <Navbar.Brand className="text-light">
          AdminDashboard
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{
            background: "#ff0000",
            marginRight: '10px'
          }}
        />

        <Navbar.Collapse
          id='respnsive-navbar-nav'>
          <Nav className='mr-auto'>
            <NavLink to="/Home">
              <label className="btn btn-dark">Home</label>
            </NavLink>
          </Nav>

          <Nav className='mr-auto' style={{ marginLeft: "5px" }}>
            <NavDropdown title="location" id="Nav-Navdropdown-title">
              <NavDropdown.Item>
                <NavLink to="/state">
                  <label className="btn btn-warning">StateRegis</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/city">
                  <label className="btn btn-warning">CityRegis</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/area">
                  <label className="btn btn-warning">AreaRegis</label>
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className='mr-auto' style={{ marginLeft: "5px" }}>
            <NavDropdown title="component" id="Nav-Navdropdown-title" >
              <NavDropdown.Item>
                <NavLink to="/shopetype">
                  <label className="btn btn-warning">ShopeType</label>
                </NavLink>
              </NavDropdown.Item>
             
              <NavDropdown.Item>
                <NavLink to="/registration">
                  <label className="btn btn-warning">Registration</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/MemberRegis">
                  <label className="btn btn-warning">MemberRegis</label>
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>


          <Nav className='mr-auto' style={{ marginLeft: "5px" }}>
            <NavDropdown title="report" id="Nav-Navdropdown-title" >
              <NavDropdown.Item>
                <NavLink to="/statereport">
                  <label className="btn btn-warning">StateReport</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/cityreport">
                  <label className="btn btn-warning">CityReport</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/areareport">
                  <label className="btn btn-warning">AreaReport</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/ShopeTypeReport">
                  <label className="btn btn-warning">ShopeTypeReport</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/productreport">
                  <label className="btn btn-light">ProductReport</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/OwnerReport">
                  <label className="btn btn-light">OwnerReport</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/MemberRegisReport">
                  <label className="btn btn-light">MemberRegisReport</label>
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <Nav style={{ marginLeft: "5px" }}>
            <NavLink to="/about">
              <label className='btn btn-dark'>About</label>
            </NavLink>
          </Nav>
          <Nav style={{ marginLeft: "5px" }}>
            <NavLink to="/Signin">
              <label className='btn btn-dark'>Signout</label>
            </NavLink>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default AdminDashboard;