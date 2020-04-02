import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios'

const CartIcon = (props) =>{

    let authToken = localStorage.getItem('OV_TKN_1aUTh');
    //local s
    let anonToken = localStorage.getItem('OV_Anon_2aUTh');

     //redux state
     const {itemAdded, cartChange} = useSelector(state=>state.cartReducer);
     //const dispatch = useDispatch();


    const [cartIconState, setCartIcontState] = useState({
        cartLength:0
    })

    const {cartLength} = cartIconState;

    //get length from local storage
      const isLen = localStorage.getItem('ov_crt_len');
      console.log(isLen)

      useEffect(()=>{
        
        getCartItems()
   
        //eslint-disable-next-line
   },[itemAdded,cartChange]);


   //FUNCTION THAT GETS CART ITEMS  
   async function getCartItems(){
    try {

     //check if one is loged in
    //if loged in send request to diffrent route if not other wise
        if(authToken){
            //for loged in user
            axios.defaults.headers.common['x-auth-token'] = authToken;
            const cartItems =await axios.get(`/api/product-logedin-order`);
           
            setCartIcontState({
                ...cartIconState,
                cartLength:cartItems.data.length
            })
        }
        else{
            //for anonymous user
            const response =await axios.get(`/api/product-cart`);
            const cartItems = response.data.filter(item => item.anonUserToken.toString() === anonToken);
            setCartIcontState({
             ...cartIconState,
             cartLength:cartItems.length
         })
     }
        }
        
      
    catch (err) {
        console.log(err.message)
    }

    }


    const showCart = ()=>{
        let cart = document.querySelector('.ov-cart');
        let cartIcon = document.querySelector('.ov-cart-icon');
        cart.style.left = '0';
        cartIcon.style.display = 'none';
        console.log('show cart');
    }

    return(
        <div className="ov-cart-icon" onClick={showCart}>
            <div className="ov-cartitems-number"><p>{cartLength} </p></div>
            <div className="ov-cart-img-cont">
              <img src="/cart.svg" className="ov-cart-img" alt="cart"/>  
            </div>
        </div>
    )
}

export  default CartIcon;