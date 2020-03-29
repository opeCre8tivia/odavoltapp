import axios from 'axios';
//sets the token to the request header
const setAuthToken = token=>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;