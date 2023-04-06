import React from "react";
import { Button } from "react-bootstrap";
const Test=()=>{
    return (

        <div className="container" style={{ margintop: '180px' }}>
            <form
                className="container border border-danger col-sm-offset-12 col-sm-4 mt-4"
                style={{ backgroundColor: 'steelblue' }}>
                <h1 className="text-center text-white">Profile Update</h1>
                <div>
                
                    <input
                        type="text"
                        name="userNmae"
                        className="form-control mb-3"
                        placeholder='enter the username'
                    />
                    <input
                        type="text"
                        name="contact"
                        className="form-control mb-3"
                        placeholder='enter the contact'
                    />
                    <input
                        type="text"
                        name="email"
                        className="form-control mb-3"
                        placeholder='enter the email'
                    />
                    <input
                        type="text"
                        name="password"
                        className="form-control mb-3"
                        placeholder='enter the password'
                    />

                    <input
                        type="text"
                        name="address"
                        className="form-control mb-3"
                        placeholder='enter the address'
                    />

                </div>
                <div className="container text-center">
                    <Button
                        type="submit"
                        className="btn btn-success text mb-4"
                    >
                        update
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default Test;