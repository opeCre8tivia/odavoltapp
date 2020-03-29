import React from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';








const AddToCartBtn = (props) =>{

        //redux
        const  dispatch = useDispatch()

   const showAddedAlert = ()=>{
    let alert = document.querySelector('.ov-addtocart-alert');
    alert.style.opacity = '1';
    
}

const HideAddedAlert = ()=>{
    let alert = document.querySelector('.ov-addtocart-alert');
    alert.style.opacity = '0';
    
}



    //add to cart function
  const   addToCart = async (id, name) =>{
        //make a post  request to backend with id of item to load
        try {
            //check if one is loged in
            //if loged in send request to diffrent route if not other wise
            let authToken = localStorage.getItem('OV_TKN_1aUTh');
           
            

            if(authToken){
                //check whether item with the same name already exists in the order  table
                const orderz = await axios.get(`http://localhost:5000/api/product-logedin-order`);
                const found = orderz.data.find(order => order.name === name);
                        if(found){
                                 console.log('item already exists');
                        }
                        else{

                                    const res = await axios.post(`http://localhost:5000/api/product-logedin-order`, {id});
                                    if(res.data.msg === "Item added"){
                                        dispatch({type:'ITEM_ADDED'});
                                        showAddedAlert();
                                        setTimeout(()=>{
                                            HideAddedAlert();
                                        },2000)
                                    }
                        }
                
            }
        else{

            const anonUserToken =  localStorage.getItem('OV_Anon_2aUTh');
             //check whether item with the same name already exists in the order  table
             const orderz = await axios.get(`http://localhost:5000/api/product-cart`);
             const found = orderz.data.find(order => order.name === name && order.anonUserToken.toString() === anonUserToken);
                    if(found){
                             console.log('item already exists');
                    }
                    else{
                                const res = await axios.post(`http://localhost:5000/api/product-cart`, {id,anonUserToken});
                                if(res.data.msg === "Item added"){
                                    dispatch({type:'ITEM_ADDED'});
                                    showAddedAlert();
                                    setTimeout(()=>{
                                        HideAddedAlert();
                                    },2000);


                                }
                        
                    }
                
            } 
            
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <div className="ov-addtocart-btn" onClick={()=>{
            let id = props.id;
            let name = props.name
            addToCart(id, name)
        }}>
            <p>+</p>
        </div>
    )
}

export  default AddToCartBtn;