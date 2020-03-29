const initialState = {
    
        msg:'',
        type:'',
        id:0
    
}

const AlertReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SET_ALERT':
            return {
                ...state,
                msg:action.payload.msg,
                type:action.payload.type,
                id:action.payload.id

            }
        case 'REMOVE_ALERT':
            return {
                ...state,
                msg:'',
                type:'',
                id:0

            }
        default:
            return state;
    }
}

export default AlertReducer;