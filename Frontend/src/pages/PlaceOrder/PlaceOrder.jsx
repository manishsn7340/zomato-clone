import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""

  })

  const onchangeHandler = (event) =>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);  //sending the user session url
    }
    else{
      alert("Error");
    }

  }

  const navigate = useNavigate();

  useEffect(() => {
  if (!token) {
    navigate('/cart');
  } else if (getTotalCartAmount() === 0) {
    navigate('/cart');
  }
}, [token]);



  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multifields">
          <input name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder="First Name" required/>
          <input name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder="Last Name" required />
        </div>
        <input name="email" onChange={onchangeHandler} value={data.email} type="email" placeholder="Email Address" required />
        <input name="street" onChange={onchangeHandler} value={data.street}  type="text" placeholder="Street Address"  required/>
        <div className="multifields"> 
          <input name="city" onChange={onchangeHandler} value={data.city}  type="text" placeholder="City" required />
          <input name="state" onChange={onchangeHandler} value={data.state} type="text" placeholder="State" required />
        </div>
        <div className="multifields">
          <input name="zipcode" onChange={onchangeHandler} value={data.zipcode} type="text" placeholder="Zip Code"  required/>
          <input name="country" onChange={onchangeHandler} value={data.country} type="text" placeholder="Country" required />
        </div>
        <input name="phone" onChange={onchangeHandler} value={data.phone}  type="tel" placeholder="Phone Number"  required/>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
        </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
      </div>
      </div>
    </form>
  )
}

export default PlaceOrder
