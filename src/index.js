import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ButtonPage from '@packages/pages/ButtonPage';


ReactDOM.render((<HashRouter>
    <Route path="/"  component={(props)=><ButtonPage {...props}/>} />
</HashRouter>), document.getElementById("root"));