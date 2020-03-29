import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDash = (props) =>{

    const [allOrders, setAllOrders] = useState([]);

    

    useEffect(()=>{
        getOrders()
    },[]);

  //get all orders from the back end
  async function getOrders(){
   try {
    const res = await axios.get(`http://localhost:5000/api/new-orders`);
    if(res){
        setAllOrders(res.data);
    }
        } catch (err) {
            console.log(err.message);
        }  
     };

     
    //method to set order details to local storage according to the event target
    function showDetails(event,order){
        let btn = event.target;
        btn.setAttribute("data-target","#exampleModal");
       
    }


    return (
        <div className=" vo-container-dashboard">

        <div className=" ov-profile">

            <button className="ov-button"> menu</button>

        </div>
        <div className="ov-dashboard-menu-cont">

            <div className="vo-dashboard-menu">
                <h2>menu</h2>
                <ul>
                    <li>overview</li>
                    <li>analytics</li>
                    <li>account settings</li>
                    <li>old orders</li>
                    <li>new orders</li>
                </ul>

               
            </div>


        </div>

    <div className=" ov-containers">
        <div className="row">
            <div className="col-lg-5 ov-section-one">
            <div className="noOrderWarning" style={{marginBottom:'10px'}}>NEW ORDERS</div>

                            <div className="ov-dash-scroll-cont">
                            {allOrders.length <= 0 ? <div className="noOrderWarning"  >NO ORDERS YET <p>STAY CALM GOD IS AT WORK</p></div> :
                            allOrders.map(order => order.status === 'new' ? <div className="new-order" key={order._id} >
                        
                            <div style={{width:'150px'}}><span className=" badge bg-danger new-tag"  style={{marginRight:'5px'}} >new order</span>{order.name }</div>
                            <div style={{width:'100px'}}>{order.mobile}
                            
                            </div>
                    <div className="order-info">
                        <span className="badge badge-primary " data-toggle="exampleModal" data-target="#exampleModal"  >View Details</span>
                     </div>
                     <div className="new-order-check-box">
                         <input type="checkbox" style={{cursor:'pointer'}} onClick={()=>{
                        // this.orderStatus(order)
                    }}  /></div>
                            {/*------ modal code -------*/}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                        <div className="modal-header" >
                                            <h5 className="modal-title" id="exampleModalLabel">NEW ORDER</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                            {order.orderDetails.map(item => <div className="order-details-cont">
                                            <div className="order-details-div" ><div className="tag">Name:</div><div>{item.nam}</div>  </div>
                                            <div className="order-details-div" ><div className="tag">Tel:</div>{item.units}  </div>
                                            <div className="order-details-div" ><div className="tag">Area:</div>{item.unitPrice}  </div>
                                            <div className="order-details-div" ><div className="tag">Date:</div>{` ${item.time.year} : ${item.time.month} : ${item.time.date}`}  </div>
                                            <div className="order-details-div" ><div className="tag">Time:</div>{`${item.time.hours}: ${item.time.minutes}: ${item.time.seconds}`}</div>
                                            {/* <div className="order-details-div" ><div className="tag">Order:</div>{this.state.orderItemsArray.map(item=> <div className="orderArray-cont">{item.name} : {item.price} : {item.unit}</div>)}</div>
                                            <div className="order-details-div" ><div className="tag">Total:</div>{this.state.totalPrice} </div>  */}
                                        
                                        </div>)}
                                        
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div> 
    
    
                                </div> : '' )}

                                </div>
                        

            </div>
            <div className="col-lg-5 ov-section-two">

            </div>

            <div className="col-lg-3 col-md-4 col-sm-12 xs-12 ov-section1"> 

            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 xs-12 ov-section2"> </div>
            <div className="col-lg-3 col-md-4 col-sm-12 xs-12 ov-section3"> </div>
        </div>
    </div>

</div>
    )
}
export default AdminDash;