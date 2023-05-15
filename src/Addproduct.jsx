import React, { useState } from 'react';
// import './App.css'; 
import { toast } from 'react-toastify';   //use this both import in your react project( where you want to show alert)to display beautiful alerts 
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate=useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price,
      category,
      company,
      loggedInUserId: JSON.parse(localStorage.getItem("user"))._id
    };

    if (name === '' || price === '' || category === '' || company === '') {
      setShowAlert(true);
      return false;
    }

    try {
      const apiResult = await fetch("https://power-ebon.vercel.app/add-product", {
        method: 'post',
        body: JSON.stringify(newProduct),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await apiResult.json();
      console.log(response);
      navigate('/')
      // Clear the form fields
      setName('');
      setPrice('');
      setCategory('');
      setCompany('');

      toast.success('Item Added Successfully!'); // Success notification
    } catch (error) {
      console.error(error);
      toast.error('Failed to add item'); // Error notification
    }
  };

  // Rest of your component code...



  return (
    <>
      <h2 className='jk'>Add Product</h2>
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            placeholder='Enter product'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
{ showAlert && name === '' && <span className="err">Enter valid Name*</span>}
        </label>
        <label>
          Price:
          <input
            type="text"
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
{ showAlert && price === '' && <span className="err">Enter valid price*</span>}
        </label>
        
        <label>
          Category:
          <input
            type="text"
            value={category}
            placeholder='Enter category'
            onChange={(e) => setCategory(e.target.value)}
          />
{ showAlert && category === '' && <span className="err">Enter valid category*</span>}
        </label>
        <label>
          Company:
          <input
            type="text"
            placeholder='Company'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
{ showAlert && company === '' && <span className="err">Enter valid Company*</span>}
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
    </>
  );
};

export default AddProduct;
