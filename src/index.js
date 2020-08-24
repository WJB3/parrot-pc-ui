import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ButtonPage from '@packages/pages/common/ButtonPage';
import SpacePage from '@packages/pages/SpacePage';
import AvatarPage from '@packages/pages/display/AvatarPage';
import TabsPage from '@packages/pages/display/TabsPage';
import TransitionPage from '@packages/pages/common/TransitionPage';
import "./index.scss";


ReactDOM.render((<HashRouter>
    <Route path="/avatar"  component={(props)=><AvatarPage {...props}/>} />
    <Route path="/button"  component={(props)=><ButtonPage {...props}/>} />
    <Route path="/tabs"  component={(props)=><TabsPage {...props}/>} />
    <Route path="/transition"  component={(props)=><TransitionPage {...props}/>} />
</HashRouter>), document.getElementById("root"));