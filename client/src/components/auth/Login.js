
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoginUserAction,setAlert,LoadUser} from '../../redux/actions';



 
const Login = (props) =>{

    const [user,setUser] = useState({
        
        mobile:'',
        password:'',
    });

    const {mobile,password} = user;

    //redux state
     const dispatch = useDispatch();
     const authState = useSelector(state => state.AuthReducer);
     const alertState = useSelector(state => state.AlertReducer);
     console.log(authState.isAuthenticated);
     console.log(authState.user);
  
   
    useEffect(()=>{
        /*  redirecting
        *   use local storage token and user as conditions for redirecting to client dashboard
        */
        let localtoken = localStorage.getItem('OV_TKN_1aUTh');
        if(authState.error){
            dispatch(setAlert(authState.error, 'danger'))
        }
        else if(localtoken){
            //check if user is not null before redirectin
               props.history.push('/client-dash');
               console.log('called');
        }
       
        //eslint-disable-next-line
    },[authState.error,authState.isAuthenticated,props.history]);

    const onChange =(event)=>{
        setUser({...user, [event.target.name]:event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault();
        //basic error checking
        if( mobile === "" || password === ""){
            let msg ='All fields are required';
            dispatch(setAlert(msg, 'danger'));
        }
        else{
     

        const formData = {
                mobile:mobile,
                password:password,
               
            }
            // dispatch loaduser and Loginuser actions
            
            dispatch(LoginUserAction(formData));
             dispatch(LoadUser())
            
     
            
           

            // reset form values
            setUser({...user,mobile:'',password:''});


        }
    }




    return(
        <div className="ov-authform-section">
            <div className="ov-authpage-text">LOGIN TO <span>ODAVOLT</span></div>
             <div className= {`ov-alert-cont bg-${alertState.type}`} > {alertState.msg} </div>
            <div className="col-lg-5 col-md-5 col-sm-10 col-xs-10 ov-authform-cont">
                
                <form onSubmit={onSubmit} >
                   
                    <div className="form-group">
                        <input type='text' className="form-control" placeholder="Enter Mobile No" name="mobile" value={mobile} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type='password' className="form-control" placeholder="Enter Password" name="password" value={password} onChange={onChange}/>
                    </div>
                    
                    <div className="form-group">
                        <input type='submit' className="btn ov-authpage-btn" value="LOGIN"/>
                    </div>
                   
                </form>
            </div>

        </div>
    )
}

export  default Login;