import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ButtonPage from '@packages/pages/common/ButtonPage';
import PortalPage from '@packages/pages/common/PortalPage';
import ResizeObserverPage from '@packages/pages/common/ResizeObserverPage';
import AvatarPage from '@packages/pages/display/AvatarPage';
import TabsPage from '@packages/pages/display/TabsPage';
import TransitionPage from '@packages/pages/common/TransitionPage';
import AffixPage from '@packages/pages/navigation/AffixPage';
import BreadcrumbPage from '@packages/pages/navigation/BreadcrumbPage';
import GridPage from '@packages/pages/common/GridPage';
import FormPage from '@packages/pages/data/FormPage';
import "./index.scss";


ReactDOM.render((<HashRouter>
    <Route path="/avatar" exact component={(props)=><AvatarPage {...props}/>} />
    <Route path="/button" exact component={(props)=><ButtonPage {...props}/>} />
    <Route path="/tabs" exact component={(props)=><TabsPage {...props}/>} />
    <Route path="/transitions" exact component={(props)=><TransitionPage {...props}/>} />
    <Route path="/portal" exact component={(props)=><PortalPage {...props}/>} />
    <Route path="/resizeobserver" exact component={(props)=><ResizeObserverPage {...props}/>} />
    <Route path="/affix" exact component={(props)=><AffixPage {...props}/>} /> 
    <Route path="/grid" exact component={(props)=><GridPage {...props}/>} />
    <Route path="/"  exact component={(props)=><FormPage {...props}/>} />
</HashRouter>), document.getElementById("root"));