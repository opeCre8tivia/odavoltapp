import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RegisterUserAction,setAlert} from '../../redux/actions'


const Signup = (props) =>{

    const [user,setUser] = useState({
        name:'',
        mobile:'',
        password:'',
        confirmPassword:''
    });

    const {name,mobile,password,confirmPassword} = user;

    //redux state
     const dispatch = useDispatch();
     const authState = useSelector(state => state.AuthReducer);
     const alertState = useSelector(state => state.AlertReducer);
  
   
    useEffect(()=>{
        console.log(authState.token);
        let localtoken = localStorage.getItem('OV_TKN_1aUTh');
        if(authState.error){
            dispatch(setAlert(authState.error, 'danger'))
        }
        else if(authState.token !==null){
            props.history.push('/login')
        }
        else if(localtoken){
            props.history.push('/client-dash');
        }
        //eslint-disable-next-line
    },[authState.error,authState.token,props.history]);

    const onChange =(event)=>{
        setUser({...user, [event.target.name]:event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault();
        //basic error checking
        if(name === "" || mobile === "" || password === "" || confirmPassword === ""){
            let msg ='All fields are required';
            dispatch(setAlert(msg, 'danger'));
        }
        else if(password !== confirmPassword){
            let msg ='Passwords Do not match'
            dispatch(setAlert(msg, 'danger'));
        }
        else{
            // get time details
        let date = new Date()

        let time = {
            year: date.getFullYear(),
            month:(date.getUTCMonth()+1),
            date:date.getDate(),
            hours:date.getHours(),
            minutes:date.getMinutes(),
            seconds:date.getSeconds()
        }
            // get navigator details
            let client = navigator.userAgent;

            const formData = {
                name:name,
                mobile:mobile,
                password:password,
                client:client,
                time:time,
                ip:'0.000.00.00.2'
            }
            // dispatch reqister  action
            dispatch(RegisterUserAction(formData))

            // reset form values
            //document.location.reload();
            setUser({
                ...user,
                name:'',mobile:'',password:'',confirmPassword:''
            })

        }
    }

    



    return(
        <div className="ov-authform-section">
            <div className="ov-authpage-text">REGISTER <span>NOW</span></div>
            <div className= {`ov-alert-cont bg-${alertState.type}`} > {alertState.msg} </div>
            <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10 ov-authform-cont">
                
                <form onSubmit={onSubmit} >
                    <div className="form-group">
                        <input type='text' className="form-control" placeholder="Enter Name" name="name" value={name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type='text' className="form-control" minLength={10} maxLength={10} placeholder="Enter Mobile No i.e 07787..." name="mobile" value={mobile} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type='password' className="form-control" placeholder="Enter Password" name="password" value={password} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type='password' className="form-control" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type='submit' className="btn ov-authpage-btn" value="SIGN UP"/>
                    </div>
                   
                </form>
            </div>
       
        </div>
    )
}

export  default Signup;