
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from './pages/Home';
import Splashpage from './pages/Splash';
import Testpage from './pages/test';
import Dashboard_home from './dashboard/homepage';


const PrivateRoute =(props)=>{
  const token = localStorage.getItem("aop_token");
  if(token){
    return <Route exact={true} path={props.path} component={props.component}/>
  }
  else{
    return <Homepage {...props}/>
  }


}

function App() {
  return (
    <Router>
           
            <Switch>
              <Route exact path='/' component={Homepage}></Route>
              <Route exact path='/:apptype/:shorturl' component={Splashpage}></Route>
              <Route exact path='/user' component={Testpage}></Route>

              <PrivateRoute path='/dashboard' component={Dashboard_home} ></PrivateRoute>
              {/* this if for error page 404 */}
              <Route component={Homepage}></Route>  

             

             
            </Switch>
         
       </Router>
  );
}

export default App;
