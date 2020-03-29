const initialState ={
    cartStatus:'hidden',
    itemAdded:0,
    cartChange:0
}

const cartReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SHOW_CART':
            return ({
                ...state,
                cartStatus:'visible'
            });
        case 'HIDE_CART':
            return {
                ...state,
                cartStatus:'hidden'
            }
            case 'ITEM_ADDED':
                let count = Math.random();
                
                return {
                    ...state,
                    itemAdded:count 
                }
                case 'CART_CHANGE':
                    let cartCount = Math.random();
                    return {
                        ...state,
                        cartChange:cartCount, 
                    }
                   
        default:
            return state
    }
}

export default cartReducer;