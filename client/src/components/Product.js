import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import AddToCartBtn from './AddToCartBtn';

const Product = (props) =>{
    
    //component state
     const [productState, setProductState] = useState({
        productList:[]
    })
    const {productList} = productState;

    //redux state
   // const authState = useSelector(state => state.AuthReducer);
  
    


    //useEffect hook
    useEffect(()=>{
        const getProducts = async () =>{
            try {
                const products =await axios.get(`http://localhost:5000/api/product`);
                setProductState({
                    ...productState,
                    productList:products.data
                })
            } catch (err) {
                console.log(err.message)
            }
    }
    getProducts();
    //eslint-disable-next-line
    },[]);

    return(

        <Fragment>
        {
             productList.map(item =>
                <div className="col-lg-2 col-md-2 col-sm-8 col-xs-8 ov-product-cont" key={item._id}>
                    <div className="ov-product-image-cont">
                        <img src={item.imageUrl} alt="ov-product" className=" ov-product-image img-fluid"/>
                    </div>
                    {/* ---- add to cart btn component */}
                    <AddToCartBtn id={item._id} name={item.name} />
                    <div className="ov-product-price-cont">
                        {item.minPrice}ugx
                    </div>
                    <div className="ov-product-description-cont">
                        <h6>{item.description} </h6>
                        <p>1{item.units} @{item.unitPrice} Ugx</p>
                    </div>

             </div>
            )
        }
        </Fragment>
    )
}

export  default Product;