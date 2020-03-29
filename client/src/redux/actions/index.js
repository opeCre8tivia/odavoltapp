import axios from 'axios';
import setAuthToken from '../../Utils/setAuthToken'

// cart actions
export const ShowCart= () =>{
    return function (dispatch) {
        dispatch({
            type:'SHOW_CART'

        })
    }
}

export const HideCart = ()=>{
    return function(dispatch){
        dispatch({
            type:'HIDE_CART'
        })
    }
}


//load user action
/*LoadUser action  => hits /api/user endpoint with a token set on the header
*  gets back user data and sends it in the pay load
*/
export const LoadUser = () =>{
    return async function(dispatch){
             //get token from local storage and set it in the header
        let token = localStorage.getItem('OV_TKN_1aUTh');
        
        if(token){
           setAuthToken(token);

            try {
                let res = await axios.get(`http://localhost:5000/api/auth`);
                console.log(res.data)
                dispatch({
                    type:'USER_LOADED',
                    payload:res.data    
                })
            } catch (err) {
                dispatch({
                    type:'AUTH_ERROR'
                })
            }
        }
        
        

       
    }
}


//register user actions
export const RegisterUserAction = (formData)=>{
    return async function(dispatch){
            //make arequest to api/users  and return a token
            try{

              const res = await axios.post(`http://localhost:5000/api/users`, formData);

                dispatch({
                    type:'REGISTER_SUCCESS',
                    payload:res.data
                })
            }
            catch(err){
                dispatch({
                    type:'REGISTER_FAIL',
                    payload:err.response.data.msg
                })
            }

        
    }
}



export const setAlert = (msg, type) =>{
    return function(dispatch){
        const id = Math.random();
        dispatch({
            type:'SET_ALERT',
            payload:{msg,type, id}

        })

        setTimeout(()=>dispatch({type:'REMOVE_ALERT', payload:{id}}),5000);
    }
}


//login user action

export const LoginUserAction = (formData) =>{
    return async function (dispatch){
      try {

        let res = await axios.post(`http://localhost:5000/api/auth`, formData); //res contains user data
        if(res.data.ov_err === true){
            dispatch({
                type:'LOGIN_FAIL',
                payload:res.data.msg
            })
        }
        else{
        

            dispatch({
                type:'LOGIN_SUCCESS',
                payload:res.data
            },LoadUser())
    
            
        }
                 
      } catch (err) {
          //console.log(err.response.data.msg);
        dispatch({
            type:'LOGIN_FAIL',
            payload:err.response.data.msg
        })
      }
       
    }
}


