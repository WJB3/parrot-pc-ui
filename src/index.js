import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import VirtualListPage from '@packages/pages/data/VirtualListPage';
//import TreePage from '@packages/pages/data/TreePage';
import "./index.scss"; 
//import SelectPage from '@packages/pages/data/SelectPage';
import PaginationPage from '@packages/pages/common/PaginationPage';
import CardPage from '@packages/pages/display/CardPage';


ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><PaginationPage {...props}/>} />
    <Route path="/card" exact component={(props)=><CardPage {...props}/>} />
</HashRouter>), document.getElementById("root"));