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
    <Route path="/avatar"  component={(props)=><AvatarPage {...props}/>} />
    <Route path="/button"  component={(props)=><ButtonPage {...props}/>} />
    <Route path="/tabs"  component={(props)=><TabsPage {...props}/>} />
    <Route path="/transitions"  component={(props)=><TransitionPage {...props}/>} />
    <Route path="/portal"  component={(props)=><PortalPage {...props}/>} />
    <Route path="/resizeobserver"  component={(props)=><ResizeObserverPage {...props}/>} />
    <Route path="/affix"  component={(props)=><AffixPage {...props}/>} /> 
    <Route path="/grid"  component={(props)=><GridPage {...props}/>} />
    <Route path="/"  component={(props)=><FormPage {...props}/>} />
</HashRouter>), document.getElementById("root"));