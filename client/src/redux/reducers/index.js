import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import AuthReducer from './AuthReducer';
import AlertReducer from './AlertReducer'



const allReducers = combineReducers({
  cartReducer:cartReducer,
  AuthReducer:AuthReducer,
  AlertReducer:AlertReducer
});

export default allReducers;