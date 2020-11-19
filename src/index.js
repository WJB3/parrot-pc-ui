import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import VirtualListPage from '@packages/pages/data/VirtualListPage';
//import TreePage from '@packages/pages/data/TreePage';
import "./index.scss"; 
//import SelectPage from '@packages/pages/data/SelectPage';
// import PaginationPage from '@packages/pages/common/PaginationPage';
import CardPage from '@packages/pages/display/CardPage';
//import TablePage from '@packages/pages/display/TablePage';


ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><CardPage {...props}/>} /> 
</HashRouter>), document.getElementById("root"));