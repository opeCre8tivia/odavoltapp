import React from 'react';

const OrderDetails = (props) =>{


    return(
        <div className="ov-new-order-detail-cont">
            <div> NEW ORDER</div>
            <div>{props.order.orderDetails[0].name}  </div>

        </div>
    )
}

export default OrderDetails;