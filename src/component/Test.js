import React, { useState, useEffect } from "react";
import firebase from "firebase";

const initData={
    phoneNumber:"",
    confirmResult:"",
    verficationCode:"",
    userID:"",
    isSend:false
}
const Test = () => {
    const [state,setState]=useState(initData);

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible"
            }
        );
    }, []);
const {phoneNumber,userID,isSend,confirmResult,verficationCode}=state;
    const handleChange=(e)=>{
         const {name,value}=e.target;
         setState({...state,[name]:value});
    }
    const validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
        return regexp.test(state.phoneNumber);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePhoneNumber()) {
            const appVerifier = window.recaptchaVerifier;
            firebase
                .auth()
                .signInWithPhoneNumber(state.phoneNumber, appVerifier)
                .then(value => {
                     state.confirmResult=value;
                    let name="isSend";
                    setState({...state,[name]:true})
                })
                .catch(error => {
                    alert("Error :", error);
                });
        }
        else {
            alert("Invalid Number");
        }
    };

    console.log("state issend-----------",state.isSend);
    const handleVerifyCode = (e) => {
        e.preventDefault();
        if (verficationCode.length === 6) {
            confirmResult
                .confirm(verficationCode)
                .then(user => {
                  //  setUserID(user.uid);
                   state.userID=user.uid;
                    alert(`Verified: ${userID}`);
                })
                .catch(error => {
                    alert("Error :", error);
                });
        } else {
            alert("Please enter a 6 digit OTP code.");
        }
    };

    const onChangePhoneNumber = (e) => {
        e.preventDefault();
        state.verficationCode="";
      //  setVerficationCode("");
      state.confirmResult="";
      //  setConfirmResult(null);
        state.isSend=false;
       // setIsSend(false);
    };

    return (
        <div className='container' style={{ marginTop: "170px" }}>
            <form
                className='container border border-dark col-sm-offset-5 col-sm-5 mb-4'
                style={{ backgroundColor: "#0B0B45" }} onSubmit={handleSubmit} >
                <h2 className='text-danger text-center'>OTP Verification</h2>
                {!isSend ? (
                    <div className="mt-4">
                        <label className="text-danger">Enter mobile number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className='form-control'
                            placeholder='enter number'
                            onChange={handleChange}
                            required
                        />
                        <div className="send-button">
                            <button
                                type='submit'
                                id="recaptcha-container"
                                className='btn btn-warning mt-3 mb-5'>
                                Send OTP
                            </button>
                        </div>
                    </div>
                ) : null}

                {state.isSend ? (
                    <div className="form">
                        <label  className="text-danger" htmlFor="code">Enter Verification Code</label>
                        <input
                            type="number"
                            name="verficationCode"
                            placeholder="Enter six digit number"
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        <div className="btn-group ">
                            <div className="verify-code">
                                <button
                                    className="btn btn-warning mt-3 mb-5"
                                    type="button"
                                    onClick={handleVerifyCode}
                                >
                                    Verify Code
                                </button>
                            </div>
                            <div className="balck-button">
                                <button className="btn btn-warning mt-3 mb-5 ms-4"
                                    onClick={onChangePhoneNumber}>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}

            </form>
        </div>
    );
};
export default Test;