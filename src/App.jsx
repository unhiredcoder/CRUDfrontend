import React from 'react'
import Nav from './Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Footer'
import Signup from './Signup'
import Private from './Private';
import Login from './Login'
import { ToastContainer } from 'react-toastify';   //use in your root component only this tag apply at the end of all component
import Addproduct from './Addproduct'
import ProductList from './ProductList'
import UpdateProduct from './UpdateProduct'


const App = () => {
    return (
        <>
            <BrowserRouter>
            <ToastContainer  
            position={"top-center"}
            autoClose={1000}
            />
                <Nav />
                <Routes>
                    {/* we makde private component and put all the private routes(which we  dont want to access before signup) inside that private component ===> and we written a logic in private tab when threre is some data in localstorage(its mean user registered/loogedin) then we give access to all components/routes (which is inside privite) otherwise redirect to signup page again anf again */}
                    <Route element={<Private />}> 
                        <Route exact path='/' element={<ProductList/>} />
                        <Route path='/add' element={<Addproduct/>} />
                        <Route path='/update/:id' element={<UpdateProduct/>} />
                        <Route path='/logout' element={<h1>logiut</h1>} />
                    </Route>

                    <Route path='/signup' element={<Signup />} />
                    <Route path='/Login' element={<Login />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    )
}

export default App