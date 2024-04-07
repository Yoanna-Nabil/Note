import React, { useState } from 'react';
import notesImg from '../../images/notes1.png'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

    let[signUpMsg, setSignUpMsg]= useState();
    let[signUpFailMsg, setSignUpFailMsg]= useState();
    let navigate= useNavigate();

let validationSchema= yup.object({
    name: yup.string().min(3, "Minimum 3 chars").max(40, 'Maximum 40 chars').required("Name is required"),
    email: yup.string().email("Enter valid email").required("Email is required"),
    password: yup.string().matches(/^(?=.*[a-z]).*$/, "at least uppercase, lowercase one digit, special chars allow").required("Password is required"),
    age: yup.number().min(16, "You are underAge").max(100, "You died").required("Age is required"),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Please enter egyption number").required("Phone is required"),   
})

let {handleChange, handleBlur, touched, errors, handleSubmit}= useFormik({
    initialValues: {
        name: '',
        email: '',
        password: '',
        age: '',
        phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: signUp
});

function signUp(values){
axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
.then((res) => {
    setSignUpMsg(res.data.msg);
    navigate('/login');
})
.catch((err) => { // هنا زى لو انا حطيت if condition و قولت ان لو msg =! successs.
    setSignUpFailMsg(err.response.data?.msg)
})
};

function clearMsgs(){
    setSignUpMsg(" ");
    setSignUpFailMsg(" ");
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
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">
                  <form onSubmit={handleSubmit}>
                    <input
                    onFocus={clearMsgs}
                    onChange={handleChange}
                      className="form-control my-2"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                    />
                    {touched.name? <p >{errors.name}</p> : null}
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
                    <input
                    onFocus={clearMsgs}
                    onBlurCapture={handleBlur}
                    onChange={handleChange}
                      className="form-control my-2"
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter Your Age"
                    />
                    {touched.age? <p >{errors.age}</p> : null}
                    <input
                    onFocus={clearMsgs}
                    onBlurCapture={handleBlur}
                    onChange={handleChange}
                      className="form-control my-2"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter Your Phone Number"
                    />
                    {touched.phone? <p >{errors.phone}</p> : null}
                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      Sign Up
                    </button>
                    {signUpMsg ? <p>{signUpMsg}</p> : null}
                    {signUpFailMsg ? <p>{signUpFailMsg}</p> : null}
                  </form>
                  <p>Already Have Account ? <Link to={'/login'}>Login</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
