import React, { useEffect, useState } from 'react';
// import './App.css'; 
import { toast } from 'react-toastify';   //use this both import in your react project( where you want to show alert)to display beautiful alerts 
import { useParams,useNavigate } from 'react-router-dom';


const UpdateProduct = () => {
    const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const params=useParams()
  const navigate=useNavigate()
//   const [showAlert, setShowAlert] = useState(false);

useEffect(()=>{
getProductDetails();
},[])
const getProductDetails = async () =>{
  let apiResult = await fetch(`https://power-ebon.vercel.app/product/${params.id}`)
  apiResult= await apiResult.json()
  // console.log(apiResult)
setName(apiResult.name)
setCategory(apiResult.category)
setCompany(apiResult.company)
setPrice(apiResult.price)
}



  const Updater = async (e) => {
          e.preventDefault();
          const newProduct = {
            name,
            price,
            category,
            company,
          };
          const apiResult = await fetch(`https://power-ebon.vercel.app/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify(newProduct),
            headers: { 'Content-Type': 'application/json' },
          });
          setName('');
          setPrice('');
          setCategory('');
          setCompany('');
          toast.success('Item Updated Successfully!');
          navigate('/')
          // Success notification
          console.log(newProduct);
}
  return (
    <>
      <h2 className='jk'>Update Product</h2>
    <div className="add-product-form">
      <form onSubmit={Updater}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
{/* { showAlert && name === '' && <span className="err">Enter valid Name*</span>} */}
        </label>
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
{/* { showAlert && price === '' && <span className="err">Enter valid price*</span>} */}
        </label>
        
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
{/* { showAlert && category === '' && <span className="err">Enter valid category*</span>} */}
        </label>
        <label>
          Company:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
{/* { showAlert && company === '' && <span className="err">Enter valid Company*</span>} */}
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
    </>

  );
};

export default UpdateProduct;
