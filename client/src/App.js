import React from 'react';
import  {BrowserRouter  as Router, Route, Switch}  from 'react-router-dom';
import setAuthToken from './Utils/setAuthToken';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import './styles/main.css';
import './styles/dash.css';



import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ClientDash from './components/auth/ClientDash';
import AdminDash  from './components/auth/AdminDash';

import  {Provider} from 'react-redux';
 import odavoltStore from './redux/store';


 let token = localStorage.getItem('OV_TKN_1aUTh');
        if(token){
            setAuthToken(token);
        }

function App() {
  return (
    <Provider  store={odavoltStore} >
    <Router>
      <Header/>

      
        <Switch>
          <Route path="/" exact component={Home}  ></Route>
          <Route  path="/signup"  component={Signup}></Route>
          <Route path="/login" component={Login}  ></Route>
          <Route path="/client-dash" component={ClientDash}  ></Route>
          <Route path="/ov-admin-dash" component={AdminDash}  ></Route>
         
        </Switch>
     {/* <Footer/> */}
     
    </Router>
    </Provider>

  );
}

export default App;
