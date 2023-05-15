import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';   //use this both import in your react project( where you want to show alert)to display beautiful alerts 
import 'react-toastify/dist/ReactToastify.css';   //use this both import in your react project( where you want to show alert)to display beautiful alerts 



export default function Login() {
    const [name, setname] = useState('');
    const [pass, setpass] = useState('');
    const navigate = useNavigate();

    const handle = async (event) => {
        event.preventDefault(); // Prevent form submission use handle function in opening form tag onsubmit not on type btn if useing bootstrap otherwise ok
        try {
            let userlog = await fetch("https://power-ebon.vercel.app/login", {
                method: 'post',
                body: JSON.stringify({ name: name, pass: pass }),
                headers: { 'Content-Type': 'application/json' },
            });
            userlog = await userlog.json();
            if (userlog.auth  ) {
                toast.success('Login Successfully!'); // Success notification
                localStorage.setItem("user", JSON.stringify(userlog.userlog));
                localStorage.setItem("Token", JSON.stringify(userlog.auth));
                //The server-side code was sending a 404 status code for "User not found" which the client-side code didn't recognize as an error. Changing the server-side code to send a 200 status code with an error property allowed the client-side code to log the desired error message.
                navigate("/");
            } else {
                toast.warning('No such user Found :('); // Warning notification
                console.log("User does not exist in the database");
                setname("")
                setpass("")
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>


            <div className="my-form bg-dark">
                <h1>Login</h1>
                <form onSubmit={handle}> {/* Add onSubmit event handler */}
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
                    <button type="submit" className="btn btn-light mt-3">LOGIN</button>
                </form>
                <p className="mt-4">Don't have an account? <Link to="/signup">Signup</Link></p>
            </div>


            {/* <div className='login'>
                <h1>Login Here</h1>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='enter username' />
                <input type="text" onChange={(e) => setPass(e.target.value)} value={pass} placeholder='enter password' />
                <button onClick={handleLogin}>Send</button>
            </div> */}
        </>
    )
}
