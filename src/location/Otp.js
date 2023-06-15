import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import firebase from 'firebase';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Otp = () => {
  const [number, setNumber]=useState("");
  const setUpRecaptcha = () => {
    
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        'size': 'invisible',
        'callback': function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      }
    );
  };
  const onSignInSubmit = (event) => {
    event.preventDefault();
    setUpRecaptcha();
    var phoneNumber = getPhoneNumberFromUserInput(); //getPhoneNumberFromUserInput();
    console.log(phoneNumber);
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        const code = getCodeFromUserInput(); //getCodeFromUserInput();
        confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log("User signed in successfully")
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("User couldn't sign in (bad verification code?)");
        });


      }).catch((error) => {
        // Error; SMS not sent
        // ...
        alert("SMS not sent")
      });
  }

  return (
    <div className='container bg-grey'>
      <div className='row'>

        <form className='container border border-danger col-sm-offset-2 col-sm-4 mt-4'
          style={{ backgroundColor: "#00ffff" }}
          onSubmit={onSignInSubmit}>
          <h2 className='text-center'>Phone Login</h2>
          <div id='recaptcha-container'></div>
          <div>
            <label>Mobile number</label>
            {/* <input
              type='number'
              name="number"
              className="form-control mb-3"
              placeholder="Enter mobile number"
              aria-describedby='emailHelp'
            /> */}
              <PhoneInput
              defaultCountry='IN'
              placeholder="Enter phone number"
              value={number}
              onChange={setNumber}/>
          </div>
          <div className='text-center p-2'>
            <button
              type='submit'
              className='btn btn-warning '>
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}

export default Otp