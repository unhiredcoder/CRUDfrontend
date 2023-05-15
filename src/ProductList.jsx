import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';   //use this both import in your react project( where you want to show alert)to display beautiful alerts 
import { NavLink } from "react-router-dom"

function ProductList() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getproduct()
    }, []);
    const getproduct = async () => {
        try {
          const currentUserID =  JSON.parse(localStorage.getItem("user"))._id
          // Retrieve the current user's ID from localStorage
          const response = await fetch("https://power-ebon.vercel.app/products");
          const data = await response.json();
          // Filter the products to include only those created by the current logged in user
          const currentUserProducts = data.filter((product) => product.loggedInUserId === currentUserID);
      
          setProduct(currentUserProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      




    const deleteProduct = async (id) => {
        let response = await fetch(`https://power-ebon.vercel.app/item/${id}`, {
            method: 'DELETE'
        });
        response = response.json()
        if (response) {
            setProduct(prevProducts => prevProducts.filter(product => product._id !== id));
            toast.success('Item deleted successfully!'); // Warning notification
        }
    }








    const searchHandle = async (e) => {
        const key = e.target.value;
        if (key) {
            const currentUserID =  JSON.parse(localStorage.getItem("user"))._id
            let response = await fetch(`https://power-ebon.vercel.app/search/${key}`)
            response = await response.json();
          const currentUserProducts = response.filter((product) => product.loggedInUserId === currentUserID);
            if (response) {
                setProduct(currentUserProducts)
            }
        } else {
            getproduct();
        }
    }

    return (
        <>
            <h1 className='jk'>Product List</h1>
            <div className="f">
                <input type="search" onChange={searchHandle} name="" className='se' placeholder='Search Product Here...' id="se" />
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black' }}>S.no</th>
                        <th style={{ border: '1px solid black' }}>NAME</th>
                        <th style={{ border: '1px solid black' }}>PRICE</th>
                        <th style={{ border: '1px solid black' }}>CATEGORY</th>
                        <th style={{ border: '1px solid black' }}>COMPANY</th>
                        <th style={{ border: '1px solid black' }}>DELETE</th>
                        <th style={{ border: '1px solid black' }}>UPDATE</th>
                    </tr>
                </thead>
                <tbody>
  {product.length > 0 ? (
    product.map(function (item, i) {
      return (
        <tr key={i}>
          <td data="S.no" style={{ border: '1px solid black' }}>{i + 1}</td>
          <td data="Name" style={{ border: '1px solid black' }}>{item.name}</td>
          <td data="Price" style={{ border: '1px solid black' }}>{item.price}</td>
          <td data="Category"   style={{ border: '1px solid black' }}>{item.category}</td>
          <td data="Company" style={{ border: '1px solid black' }}>{item.company}</td>
          <td data="Delete" style={{ border: '1px solid black' }}>
          <button onClick={() => deleteProduct(item._id)} className='del'>Delete</button>
          </td>
          <td data="Update" style={{ border: '1px solid black' }}>
            <NavLink to={"/update/" + item._id}><button className='up'>Update</button></NavLink>
          </td>
        </tr>
      );
    })
  ) : (
      <td className='warn'>No result found :(</td>
  )}
</tbody>

            </table>
        </>
    );
}

export default ProductList;
