import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetails from './OrderDetails';

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
    function showDetails(){
        
        let detailCont = document.querySelector('.ov-order-details-cont');
        detailCont.style.display = 'block';

       
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
            <div className="col-lg-6 ov-section-one">
            <div className="noOrderWarning" style={{marginBottom:'10px'}}>NEW ORDERS</div>

                            <div className="ov-dash-scroll-cont">
                            {allOrders.length <= 0 ? <div className="noOrderWarning"  >NO ORDERS YET <p>STAY CALM GOD IS AT WORK</p></div> :
                            allOrders.map(order => order.status === 'new' ? <div className="new-order" key={order._id} >
                        
                            <div style={{width:'150px'}}><span className=" badge bg-danger new-tag"  style={{marginRight:'5px'}} >new order</span>{order.name }</div>
                            <div style={{width:'100px'}}>{order.mobile}</div><div style={{width:'100px'}}>{`${order.time.hours}:${order.time.minutes}`}</div>
                            
                            
                    <div className="order-info">
                        <span className="badge badge-primary " onClick={showDetails} >View Details</span>
                     </div>
                     <div className="ov-new-order-check-box">
                         <input type="checkbox" style={{cursor:'pointer'}} onClick={()=>{
                        // this.orderStatus(order)
                    }}  /></div>  <OrderDetails order={order} />
                             
                                </div> : '' )}

                                </div>
                        

            </div>
            <div className="col-lg-4 ov-section-two">

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