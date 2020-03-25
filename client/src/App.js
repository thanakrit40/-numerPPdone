import './App.css';
import React from 'react';
import {Route,Switch} from "react-router-dom";
import Bisection from './root/Bisection';
import Main from "./Main.js";
import Falseposition from "./root/Falseposition";
import Onepoint from "./root/Onepoint";
import Newton from "./root/Newton";
import Secant from "./root/Secant";

function App(){
    return (
      <div className="App">
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/Bisection" component={Bisection}/>
            <Route exact path="/Falseposition" component={Falseposition}/>
            <Route exact path="/Newton" component={Newton}/>
            <Route exact path="/Onepoint" component={Onepoint}/>
            <Route exact path="/Secant" component={Secant}/>
            
          </Switch>
        </React.Fragment>
      </div>
      
    )
}
export default App;
