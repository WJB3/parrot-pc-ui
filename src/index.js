import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom'; 
import "./index.scss";    
import MessagePage from '@packages/pages/display/MessagePage'; 
import NotificationPage from '@packages/pages/display/NotificationPage'; 
import AlertPage from '@packages/pages/common/AlertPage'; 
import ProgressPage from '@packages/pages/common/ProgressPage'; 

ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><ProgressPage {...props} />} /> 
</HashRouter>), document.getElementById("root"));