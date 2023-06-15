import React from 'react'
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
const MemberDashboard = () => {
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
          Member Dashboard
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
            <NavDropdown title="Report" id="Nav-Navdropdown-title">
              <NavDropdown.Item>
                <NavLink to="/AppUser">
                  <label className="btn btn-dark">AppUser</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/Registration">
                  <label className="btn btn-dark">Registration</label>
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='mr-auto' style={{ marginLeft: "20px" }}>
            <NavLink to="/">
              <label className="btn btn-dark">SignOUt</label>
            </NavLink>
          </Nav>
          <Nav className='mr-auto' style={{ marginLeft: "20px" }}>
            <NavLink to="/OwnerReport">
              <label className="btn btn-dark">Owner Report</label>
            </NavLink>
          </Nav>
          <Nav className='mr-auto' style={{ marginLeft: "20px" }}>
            <NavLink to="/Signin">
              <label className="btn btn-dark">Signin</label>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
export default MemberDashboard;