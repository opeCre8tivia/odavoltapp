import React from 'react';
import {Link} from 'react-router-dom';


const Notice = (props) =>{

    const hideNotice = ()=>{
        let notice = document.querySelector('.ov-notice-cont');
        notice.style.display = 'none';
    }

    return(
        <div className="ov-notice-cont">
            <div className="ov-notice-wrapper-inner">
            <h5>WE NOTICED YOUR NOT LOGED IN</h5>
            <p>To Place Your Order,Please Log in or create an account </p>

           <Link to="/login"> <button>LOGIN</button></Link> <Link to="/signup"><button>SIGN UP</button></Link>
                <h6 onClick={hideNotice} >dismiss</h6>
            </div>
        </div>
    )
}

export  default Notice;