import React, { useState } from 'react';
import notesImg from '../../images/notes1.png'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {

    let[signInMsg, setSignInMsg]= useState();
    let[signInFailMsg, setSignInFailMsg]= useState();
    let navigate= useNavigate();

let validationSchema= yup.object({
    email: yup.string().email("Enter valid email").required("Email is required"),
    password: yup.string().matches(/^(?=.*[a-z]).*$/, "at least uppercase, lowercase one digit, special chars allow").required("Password is required"),
})

let {handleChange, handleBlur, touched, errors, handleSubmit}= useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validationSchema: validationSchema,
    onSubmit: signIn
});

function signIn(values){
axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values)
.then((res) => {
  console.log(res);
    setSignInMsg(res.data.msg);
    localStorage.setItem("userToken", res.data.token);
    navigate('/home');
})
.catch((err) => { // هنا زى لو انا حطيت if condition و قولت ان لو msg =! successs.
    setSignInFailMsg(err.response.data.msg)
})
};

function clearMsgs(){
    setSignInMsg(" ");
    setSignInFailMsg(" ");
}

  return (
    <>
    <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign In Now</h1>
                <div className="pt-3">
                  <form onSubmit={handleSubmit}>
                   
                    <input
                    onFocus={clearMsgs}
                    onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                     {touched.email? <p>{errors.email}</p> : null}
                    <input
                    onFocus={clearMsgs}
                    onBlurCapture={handleBlur}
                    onChange={handleChange}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                    {touched.password? <p >{errors.password}</p> : null}
               
                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      Sign In
                    </button>
                    {signInMsg ? <p>{signInMsg}</p> : null}
                    {signInFailMsg ? <p>{signInFailMsg}</p> : null}
                  </form>
                  <p>Don't Have Account ? <Link to={'/'}>Register</Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
