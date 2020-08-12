import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ButtonPage from './ButtonBase/buttonPage';
import "./index.less";

ReactDOM.render((<HashRouter>
    <Route path="/"  component={(props)=><ButtonPage {...props}/>} />
</HashRouter>), document.getElementById("root"));