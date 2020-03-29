import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];



const kitchenStore = createStore(allReducers,initialState,applyMiddleware(...middleware));

export default kitchenStore;