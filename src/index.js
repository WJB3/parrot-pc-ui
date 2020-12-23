import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom'; 
import "./index.scss";    
import MessagePage from '@packages/pages/display/MessagePage'; 
import AlertPage from '@packages/pages/common/AlertPage'; 

ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><MessagePage {...props} />} /> 
</HashRouter>), document.getElementById("root"));