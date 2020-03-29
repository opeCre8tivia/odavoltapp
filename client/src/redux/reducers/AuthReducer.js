const initialState = {
    token:null,
    isAuthenticated:false,
    user:null,
    loading:false,
    error:null
}

const AuthReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'USER_LOADED':
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            }
        case 'REGISTER_SUCCESS':
         case 'LOGIN_SUCCESS':
            //set token to local storage
            localStorage.removeItem('OV_Anon_2aUTh')
            localStorage.setItem('OV_TKN_1aUTh', action.payload)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false  
            }
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOG-OUT':
        case 'ANONYMOUS':
            //remove token from local storage
            localStorage.removeItem('OV_TKN_1aUTh');
            let anonAuth = localStorage.getItem('OV_Anon_2aUTh');
            const randomId = Math.random()
            anonAuth ? console.log('already authed') : 
            localStorage.setItem('OV_Anon_2aUTh', randomId)
            return{
                isAuthenticated:false,
                loading:false,
                token:null,
                user:null,
                error:action.payload
            }
        case 'LOGIN_FAIL':
            return{
                isAuthenticated:false,
                loading:false,
                token:null,
                user:null,
                error:action.payload
            }    
        default:
            return state
    }
}


export default AuthReducer;