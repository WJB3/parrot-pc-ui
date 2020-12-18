import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom'; 
import "./index.scss";   
import Demo from '@packages/pages/Demo';
import ModalPage from '@packages/pages/display/ModalPage';

// if (process.env.NODE_ENV === 'development') {
//     const whyDidYouRender = require('@welldone-software/why-did-you-render');
//     whyDidYouRender(React, {
//       trackAllPureComponents: true,
//     });
// }

ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><ModalPage {...props} />} /> 
</HashRouter>), document.getElementById("root"));