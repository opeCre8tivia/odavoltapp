import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

const Header = (props) =>{

//redux state
    let dispatch = useDispatch();
    let authState = useSelector(state => state.AuthReducer);
    let {isAuthenticated} = authState;

//onlog out function
    const onLogout = () =>{
        dispatch({type:'LOG-OUT'});
        console.log('logout clicked')
    }

    return(
        <div className="ov-header">
            <Link to="/"><div className="ov-logo-cont">
                <img src="/ov-logo.jpg" alt="ov-logo" className="ov-logo"/>
            </div></Link>
           {isAuthenticated === true ?  <div className="ov-auth-btn-cont">
               <button className="ov-signup-btn" onClick={onLogout} >LOG OUT</button> 
            </div> :  <div className="ov-auth-btn-cont">
               <Link to="/signup"><button className="ov-signup-btn">SIGN UP</button></Link> 
                <Link to="/login"><button className="ov-login-btn">LOGIN</button></Link>
            </div>}

        </div>
    )
}

export  default Header;