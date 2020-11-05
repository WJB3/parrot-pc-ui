import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import VirtualListPage from '@packages/pages/data/VirtualListPage';
import "./index.scss"; 


ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><VirtualListPage {...props}/>} />
</HashRouter>), document.getElementById("root"));