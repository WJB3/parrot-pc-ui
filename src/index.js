import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import VirtualListPage from '@packages/pages/data/VirtualListPage';
import TreePage from '@packages/pages/data/TreePage';
import "./index.scss"; 


ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><TreePage {...props}/>} />
</HashRouter>), document.getElementById("root"));