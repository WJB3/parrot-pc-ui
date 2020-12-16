import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import VirtualListPage from '@packages/pages/data/VirtualListPage';
//import CheckboxPage from '@packages/pages/data/CheckboxPage';
import TreePage from '@packages/pages/data/TreePage';
import InputNumberPage from '@packages/pages/data/InputNumberPage';
import TransitionPage from '@packages/pages/common/TransitionPage';
import "./index.scss"; 
//import SelectPage from '@packages/pages/data/SelectPage';
// import PaginationPage from '@packages/pages/common/PaginationPage'; 
import TablePage from '@packages/pages/display/TablePage';
import Demo from '@packages/pages/Demo';
import LoadingPage from '@packages/pages/display/LoadingPage';

// if (process.env.NODE_ENV === 'development') {
//     const whyDidYouRender = require('@welldone-software/why-did-you-render');
//     whyDidYouRender(React, {
//       trackAllPureComponents: true,
//     });
// }

ReactDOM.render((<HashRouter>
    <Route path="/" exact component={(props)=><TreePage {...props} />} /> 
</HashRouter>), document.getElementById("root"));