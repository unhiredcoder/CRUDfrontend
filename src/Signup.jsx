import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';   //use this both import in your react project( where you want to show alert)to display beautiful alerts 



const Signup = () => {
  const [name,setname]=useState('')
  const [pass,setpass]=useState('')
  const navigate=useNavigate()

  useEffect(()=>{
    const auth=localStorage.getItem("user")
   if(auth){
    navigate('/')   //agar user logged in hai(means some data in localstorage) to use redirect kr do "/"
   }
  })


  const handleSignup = async (event) => {
    event.preventDefault(); 
      try {
        let result = await fetch("https://power-ebon.vercel.app/register", {
          method: 'post',
          body: JSON.stringify({ name, pass }),
          headers: { 'Content-Type': 'application/json' },
        });

        result = await result.json();
        toast.success('Registeration success :)'); // Warning notification
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("Token",JSON.stringify(result.auth))
        if(result.auth){
          navigate("/")
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (

    
    <>


<div className="my-form">
  <h1>Register</h1>
  <form onSubmit={handleSignup}> {/* Add onSubmit event handler */}
    <div className="mb-3 mt-4">
      <label htmlFor="exampleInputEmail1" className="form-label">Username*</label>
      <input
        type="text"
        onChange={(e) => setname(e.target.value)}
        value={name}
        className="form-control"
        id="exampleInputEmail1"
      />
    </div>
    <div className="mb-3 mt-4">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input
        type="password"
        onChange={(e) => setpass(e.target.value)}
        value={pass}
        className="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <button type="submit" className="btn btn-light mt-3">REGISTER</button>
  </form>
  <p className="mt-4">Already have an account? <Link to="/login">Login</Link></p>
</div>
        </> 
        )}

export default Signup