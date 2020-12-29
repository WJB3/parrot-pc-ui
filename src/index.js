import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom'; 
import "./index.scss";     
import ResultPage from '@packages/pages/feedback/ResultPage';   
import TablePage from '@packages/pages/display/TablePage';   

ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><TablePage {...props} />} /> 
</HashRouter>), document.getElementById("root"));