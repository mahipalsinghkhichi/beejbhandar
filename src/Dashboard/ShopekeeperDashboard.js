import React from 'react'
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
const ShopekeeperDashboard = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className='mt-2 col-md-12' style={{ height: "80px", backgroundColor: "#0B0B45" }}>
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
                Shopekeeper Dashboard
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
                        <NavDropdown title="ItemDetail" id="Nav-Navdropdown-title">
                            <NavDropdown.Item>
                                <NavLink to="/ProductName">
                                    <label className="btn btn-dark">Add item</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/ProductReport">
                                    <label className="btn btn-dark">Manage Item</label>
                                </NavLink>
                            </NavDropdown.Item>
                          
                        </NavDropdown>
                    </Nav>
                    <Nav className='mr-auto' style={{ marginLeft: "20px" }}>
                        <NavLink to="/">
                            <label className="btn btn-dark">Signout</label>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default ShopekeeperDashboard;