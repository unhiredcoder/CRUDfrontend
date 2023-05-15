import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

function Private() {
    const auth=localStorage.getItem("user")
  return auth?<Outlet/>:<Navigate to="/signup" />   //check kro agar localstorage me data hai to(means alrdy signup) to usko sab access krne ka permisson dedo warna agar login nhi hai to usko signup wale route pe rediredt kr do
}

export default Private