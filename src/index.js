import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom'; 
import "./index.scss";     
import ResultPage from '@packages/pages/feedback/ResultPage';   
import TablePage from '@packages/pages/display/TablePage';   
import Demo from '@packages/pages/Demo';
import EmptyPage from '@packages/pages/display/EmptyPage';   

ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><TablePage {...props} />} /> 
</HashRouter>), document.getElementById("root"));