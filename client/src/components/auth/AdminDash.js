import React from 'react';
import Overview from './Overview';
import AddNewProduct from './AddNewProduct';


const AdminDash = (props) =>{

   


    return (
        <div className=" vo-container-dashboard">

        <div className=" ov-profile">

            <button className="ov-button"> menu</button>

        </div>
        <div className="ov-dashboard-menu-cont">

            <div className="vo-dashboard-menu">
                <h2>menu</h2>
                <ul>
                   <li >overview</li>

                    <li onClick={()=>{
                        let overvu = document.querySelector('.overview');
                        let productContainer = document.querySelector('.newproduct');
                        overvu.style.display = "none";
                        productContainer.style.display = "inline-block"
                    }}>New Product</li>

                    <li>account settings</li>
                    <li>old orders</li>
                    <li>new orders</li>
                </ul> 
            </div>
        </div>
        
        <div className="overview"> <Overview/> </div>
        <div className="newproduct" style={{display:'none'}}> <AddNewProduct/> </div>
        
        
       
   

    </div>
    )
}
export default AdminDash;