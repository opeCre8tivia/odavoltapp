import React, { useEffect } from 'react';
import Slider from './Slider';
import ProductSection from './ProductSection';
import CartIcon from './CartIcon';
import AddedToCartAlert from './AddedToCartAlert'
import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import {LoadUser} from '../redux/actions';



const Home = (props) =>{

     //auth token
     let authToken = localStorage.getItem('OV_TKN_1aUTh');

    //const cartState = useSelector(state => state.cartReducer);
    const authState = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch()
    console.log(authState.isAuthenticated);
    console.log(authState.user);

    useEffect(()=>{

        if(authToken){
            dispatch(LoadUser());
        }
        else{
            dispatch({type:'ANONYMOUS'});
            console.log('authCheck called');
        }

      
      
    },[authToken,dispatch])
 

  


   

    return(
        <div className="ov-home">
                <Cart />
                <Slider/>
                <ProductSection/>
                <CartIcon />
                <AddedToCartAlert/>
                
        </div>
    )
}

export  default Home;