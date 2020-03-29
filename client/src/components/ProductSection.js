import React from 'react';
import  Product from  './Product'

const ProductSection = (props) =>{


    return(
        <div className="ov-product-section container-fluid">
            <div className="row" style={{justifyContent:'center'}}>
                <Product/>
            </div>

        </div>
    )
}

export  default ProductSection;