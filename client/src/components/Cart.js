import React, {useState, useEffect,Fragment} from 'react';
import Notice from './Notice';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';

const Cart = (props) =>{
    //auth token
    let authToken = localStorage.getItem('OV_TKN_1aUTh');
  
    //redux state
    const {itemAdded, cartChange} = useSelector(state=>state.cartReducer);
    const dispatch = useDispatch();

    //local s
    let anonToken = localStorage.getItem('OV_Anon_2aUTh');
    
        

    //component state
    const [cartState, setCartState] = useState({
        productList:[],
        total:0,
        deliveryFee:1000
    })
    const {productList,total, deliveryFee} = cartState;

    //get all cart items from order tables accordingly

     //useEffect hook
     useEffect(()=>{
      
        getCartItems();
   
    //eslint-disable-next-line
   },[itemAdded,cartChange]);



     //FUNCTION THAT GETS CART ITEMS  
     async function getCartItems(userMobile){
        try {

         //check if one is loged in
        //if loged in send request to diffrent route if not other wise
            if(authToken){
                //for loged in user
             
                const cartItems =await axios.get(`/api/product-logedin-order`);
                
                //get their total for every fetch
                let  totalUnitPrice = cartItems.data.reduce((total,item)=>{
                return  total+ parseInt(item.unitPrice);
            },0)
                setCartState({
                    ...cartState,
                    productList:cartItems.data,
                    total:totalUnitPrice
                })
                //set local storage
                localStorage.setItem("ov_crt_len", cartItems.data.length);
            }
            else{
                //for anonymous user
                
                const response =await axios.get(`/api/product-cart`);

                const cartItems = response.data.filter(item => item.anonUserToken.toString() === anonToken);
                console.log(cartItems)
                 //set local storage
                 localStorage.setItem("ov_crt_len", cartItems.length);
                //get their total for every fetch
                let  totalUnitPrice = cartItems.reduce((total,item)=>{
                    return  total+ parseInt(item.unitPrice);
            },0)
                setCartState({
                    ...cartState,
                    productList:cartItems,
                    total:totalUnitPrice
                })
            }
            
          
        } catch (err) {
            console.log(err.message)
        }
   
}





    //crud operations
    //FUNCTION THAT INCREAMENTS CART ITEM PRICE
     const increament = async (item, id, onePrice) =>{
        let {user,name,description,units,unitPrice,minPrice,count,deliverToDistrict,imageUrl} = item;
        count += 1;
        
        
        try {

             //fetch the original items coz there i need for the original price
             const products = await axios.get(`/api/product`);
             let productlist = products.data
             let prod = productlist.find(item => {
                 return item.name === name;
             });
             let originalPrice = prod.unitPrice;
             unitPrice = unitPrice+originalPrice;
             console.log(unitPrice)


            //check if one is loged in
           //if loged in send request to diffrent route if not other wise
           let authToken = localStorage.getItem('OV_TKN_1aUTh');
               if(authToken){
                   const res = await axios.put(`/api/product-logedin-order/:${id}`,{
                    user,
                    name,
                    description,
                    units,
                    unitPrice,
                    minPrice,
                    count,
                    deliverToDistrict,
                    imageUrl
                   });
                   console.log(res.data)
                   
               }
               else{
                   const res = await axios.put(`/api/product-cart/:${id}`, {
                    anonUserToken:anonToken,
                    name,
                    description,
                    units,
                    unitPrice,
                    minPrice,
                    count,
                    deliverToDistrict,
                    imageUrl
                   });
                   console.log(res.data)
                  
               }
             
           } catch (err) {
               console.log(err.message)
           }
        dispatch({type:'CART_CHANGE'});
               
    }



    //FUNCTION THAT DECREAMENTS CART ITEM PRICE
    const decreament = async (item, id) =>{
        let {name,description,units,unitPrice,minPrice,count,deliverToDistrict,imageUrl} = item;
        

        try {
                //fetch the original items coz there i need for the original price
               const products = await axios.get(`/api/product`);
              let productlist = products.data
              let prod = productlist.find(item => {
                  return item.name === name;
              });
              let originalPrice = prod.unitPrice;



                //check if the count is not equal or less than 0
                if(count <= 0){
                    
                }
                else{
                    count -= 1;
                    unitPrice = unitPrice-originalPrice;
                     //check if one is loged in
           //if loged in send request to diffrent route if not other wise
           let authToken = localStorage.getItem('OV_TKN_1aUTh');
           if(authToken){
               const res = await axios.put(`/api/product-logedin-order/:${id}`,{
                name,
                description,
                units,
                unitPrice ,
                minPrice,
                count,
                deliverToDistrict,
                imageUrl
               });
               console.log(res.data)
               
           }
           else{
               const res = await axios.put(`/api/product-cart/:${id}`, {
                anonUserToken:anonToken,
                name,
                description,
                units,
                unitPrice,
                minPrice,
                count,
                deliverToDistrict,
                imageUrl
               });
               console.log(res.data)
              
           }
                }
           
             
           } catch (err) {
               console.log(err.message)
           }
 
           dispatch({type:'CART_CHANGE'});

    }



//FUNCTION THAT REMOVES CART ITEMS
  const removeItem = async (id)=>{
    try {
        console.log(id)
        //check if one is loged in
       //if loged in send request to diffrent route if not other wise
       let authToken = localStorage.getItem('OV_TKN_1aUTh');
           if(authToken){
               const res = await axios.delete(`/api/product-logedin-order/:${id}`);
               console.log(res.data)
               
           }
           else{
               const res = await axios.delete(`/api/product-cart/:${id}`);
               console.log(res.data)
               
              
           }
         
       } catch (err) {
           console.log(err.message)
       }

       dispatch({type:'CART_CHANGE'});

        }


        //FUNCTION TO HIDE CART
        const hideCart = ()=>{
            let cart = document.querySelector('.ov-cart');
            let cartIcon = document.querySelector('.ov-cart-icon');
            cart.style.left = '-100%';
            cartIcon.style.display = 'block';
            console.log('hide cart');
        }

          //FUNCTION TO SHOW NOTICE
        const showNotice = ()=>{
            let notice = document.querySelector('.ov-notice-cont');
           notice.style.display = 'block';
            
        }
        






     return(
        
         <div className="ov-cart">
             <div className="ov-cart-close-btn" onClick={hideCart}><p>x</p></div>
             <div className="cart-scroll-cont">
             {
                
             productList.length !== 0 ? productList.map(item =><div key={item._id} className="mb-2 cart-item-cont" >
             <div className="ov-cart-cont-inner" >
                 <div style={{width:'40%'}}> {item.name}</div> <div style={{width:'25%'}} > {item.unitPrice} </div> 
             <button className="btn btn-sm ov-cal-btn"  value={item.name} onClick={()=>{ increament(item,item._id,item.unitPrice)}} >+</button> 
             <div className="ov-counter"><p>{item.count} </p></div>
               <button className="btn btn-sm ov-cal-btn" value={item.name} onClick={()=>decreament(item, item._id)} >-</button> </div>
             <div className="removeItem" onClick={()=>{
                 removeItem(item._id);
             }} ><span>x</span>remove</div>
         </div>):
             <div className="ov-cart-empty-text">YOUR CART IS EMPTY </div>
            } 
            </div>
            <Notice/>

        
             <div className="ov-cart-summary-cont">
             {productList.length !==0 ? <Fragment><ul>
                            <li><div className="ov-cart-span">Sub-total: </div>{total} </li>
                            <li><div className="ov-cart-span">Tax:</div>0.00</li>
                            <li><div className="ov-cart-span">Delivery Fee:</div> {deliveryFee} </li>
                            <li><div className="ov-cart-span">TOTAL: </div> {total + deliveryFee} </li>
                        </ul>
                         {authToken ?<Link to="/client-dash"  > <button type="button"  className="ov-cart-checkout-btn"  >PROCEED TO CHECK OUT</button></Link> :
                          <button type="button"  className="ov-cart-checkout-btn" onClick={()=>{
                              showNotice();
                          }} >PROCEED TO CHECK OUT</button> } </Fragment> :
                <button type="button"  className="ov-cart-checkout-btn"  >YOUR CART IS EMPTY</button>
                }
             </div>
             
         </div>
    )
}

export  default Cart;