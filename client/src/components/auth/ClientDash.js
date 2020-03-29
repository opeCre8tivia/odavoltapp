import React, { Fragment, useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {LoadUser} from '../../redux/actions'

const ClientDash = (props) =>{

    //component state
    const [dashState, setDashState] = useState({
        productList:[],
        total:0,
        deliveryFee:1000
    })
    const {productList,total,deliveryFee} = dashState;
    

    //redux state
    const dispatch =useDispatch()
    const authState = useSelector(state => state.AuthReducer);
    const {isAuthenticated,user} = authState
    console.log(authState.user);

    //use effect
    useEffect(()=>{
        dispatch(LoadUser());
        console.log('1000 called');

        //load items to checkout
        async function getProducts(){
            try {
                //check if one is loged in
            //if loged in send request to diffrent route if not other wise
            let authToken = localStorage.getItem('OV_TKN_1aUTh');
            if(authToken){
                const products =await axios.get(`http://localhost:5000/api/product-logedin-order`);
                  //get their total for every fetch
                  let  totalUnitPrice = products.data.reduce((total,item)=>{
                    return  total+ parseInt(item.unitPrice);
                },0)
                setDashState({
                    ...dashState,
                    productList:products.data,
                    total:totalUnitPrice
                })
            }
            else{
                const products =await axios.get(`http://localhost:5000/api/product-cart`);
                setDashState({
                    ...dashState,
                    productList:products.data
                })
            }
            } catch (err) {
                console.log(err.message)
            }
    }
    getProducts()
     //eslint-disable-next-line
    },[dispatch,LoadUser]);

    //function to redirect if user is not authenticated

    const redirect =()=>{
        props.history.push('/login');
    }

      
        //FUNCTION TO PLACE THE ORDER

       async  function  PlaceNewOrder(){

           const {name, mobile} = user;
           const  orderDetails = productList;

           try {

            const response = await axios.post(`http://localhost:5000/api/new-orders`, {
                name,
                mobile,
                orderDetails
            });

            if(response){
                console.log(response);
            }
               
           } catch (err) {
             console.log(err.message)  
           }

          clearItems()
    }



    async function clearItems(){
        try {
           await axios.delete(`http://localhost:5000/api/product-logedin-delete-all`);
        } catch (err) {
            console.log(err.message);
        }

        console.log('cleared');
    }



    return(
        <div className="container-fluid">
             {
                 isAuthenticated === true ?<Fragment>
                      <div className="ov-checkout-top-section">
                        <div  className="ov-checkout-welcome-text"> Welcome  {user !==null ? <span> {user.name}  </span>: ""} </div>
                        <div  className="ov-checkout-profile-image-cont"> <img src={user !==null ? user.profilePix : ""} alt="profilepix" className="ov-checkout-profile-image"  /> </div>
                    </div>

                    <div className="row" style={{justifyContent:'center',position:'relative'}}>
                        <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10 ov-checkout-confirm">
                            <div className="checkout-scroll-cont">
                            {productList.length !== 0 ? productList.map(item => 
                            <div className="checkout-cart-item-cont" key={item._id}>
                            <div className="cart-img-cont"><img src={item.imageUrl} className="img-fluid img-round"   alt="cart-pix"/></div>
                            <div><p> {item.name}  </p></div> <div><p> {item.unitPrice} </p></div>
                         </div> ) :
                            
                            <div className="ov-checkout-msg-cont">
                                <div className="ov-centered-wrapper">
                                 YOUR CART IS EMPTY
                                  <Link to="/"><button>GO SHOPPING</button></Link>
                                </div>
                             </div>
                            }
                            </div>

                    <div className="ov-cart-summary-cont">
                    {productList.length !==0 ? <Fragment><ul>
                            <li><div className="ov-cart-span">Sub-total: </div>{total} </li>
                            <li><div className="ov-cart-span">Tax:</div>0.00</li>
                            <li><div className="ov-cart-span">Delivery Fee:</div> {deliveryFee} </li>
                            <li><div className="ov-cart-span">TOTAL: </div> {total + deliveryFee} </li>
                        </ul>
                         <button type="button"  className="ov-cart-checkout-btn" onClick={()=>{
                    console.log('clicked');
                    PlaceNewOrder();
                }}  >PROCEED TO CHECK OUT</button> </Fragment> :
                <button type="button"  className="ov-cart-checkout-btn"  >YOUR CART IS EMPTY</button>
                }
                    </div>

                   

                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-10 col-xs-10 ov-checkout-payments">
                            
                        </div>
                    </div> 
                    </Fragment>
                    : redirect()
            
            }

        </div>
    )
}

export  default ClientDash;