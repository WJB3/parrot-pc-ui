import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ButtonPage from '@packages/pages/ButtonPage';
import SpacePage from '@packages/pages/SpacePage';


ReactDOM.render((<HashRouter>
    <Route path="/"  component={(props)=><SpacePage {...props}/>} />
</HashRouter>), document.getElementById("root"));