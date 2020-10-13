import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ButtonPage from '@packages/pages/common/ButtonPage';
import RipplePage from '@packages/pages/common/RipplePage';
import PortalPage from '@packages/pages/common/PortalPage';
import ResizeObserverPage from '@packages/pages/common/ResizeObserverPage';
import AvatarPage from '@packages/pages/display/AvatarPage';
import TabsPage from '@packages/pages/display/TabsPage';
import TransitionPage from '@packages/pages/common/TransitionPage';
import AffixPage from '@packages/pages/navigation/AffixPage';
import BreadcrumbPage from '@packages/pages/navigation/BreadcrumbPage';
import GridPage from '@packages/pages/common/GridPage';
import FormPage from '@packages/pages/data/FormPage';
import ConfigProviderPage from '@packages/pages/else/ConfigProviderPage';
import InputTextPage from '@packages/pages/data/InputPage';
import IconPage from '@packages/pages/common/IconPage';
import InputTextareaPage from '@packages/pages/data/InputTextareaPage';
import InputNumberPage from '@packages/pages/data/InputNumberPage';
import InputPasswordPage from '@packages/pages/data/InputPasswordPage';
import PopperPage from '@packages/pages/display/PopperPage';
import TooltipPage from '@packages/pages/display/TooltipPage';
import CheckboxPage from '@packages/pages/data/CheckboxPage';
import TypographyPage from '@packages/pages/common/TypographyPage';
import BackDropPage from '@packages/pages/display/BackDropPage';
import PopoverPage from '@packages/pages/display/PopoverPage';
import "./index.scss";


ReactDOM.render((<HashRouter>
    <Route path="/avatar" exact component={(props)=><AvatarPage {...props}/>} />
    <Route path="/button" exact component={(props)=><ButtonPage {...props}/>} />
    <Route path="/tabs" exact component={(props)=><TabsPage {...props}/>} />
    <Route path="/transitions" exact component={(props)=><TransitionPage {...props}/>} />

    <Route path="/resizeobserver" exact component={(props)=><ResizeObserverPage {...props}/>} />
    <Route path="/affix" exact component={(props)=><AffixPage {...props}/>} /> 
    <Route path="/grid" exact component={(props)=><GridPage {...props}/>} />
    <Route path="/form"  exact component={(props)=><FormPage {...props}/>} />
    <Route path="/configprovider"  exact component={(props)=><ConfigProviderPage {...props}/>} />
    <Route path="/inputtext"  exact component={(props)=><InputTextPage {...props}/>} />
    <Route path="/icon"  exact component={(props)=><IconPage {...props}/>} />
    <Route path="/inputtextarea"  exact component={(props)=><InputTextareaPage {...props}/>} />
    <Route path="/inputnumber"  exact component={(props)=><InputNumberPage {...props}/>} />
    <Route path="/ripple"  exact component={(props)=><RipplePage {...props}/>} />
    <Route path="/inputpassword"  exact component={(props)=><InputPasswordPage {...props}/>} />
    <Route path="/protal" exact component={(props)=><PortalPage {...props}/>} />
    <Route path="/popper" exact component={(props)=><PopperPage {...props}/>} />
    <Route path="/tooltip" exact component={(props)=><TooltipPage {...props}/>} />
    <Route path="/checkbox" exact component={(props)=><CheckboxPage {...props}/>} />
    <Route path="/typography" exact component={(props)=><TypographyPage {...props}/>} />
    <Route path="/backdrop" exact component={(props)=><BackDropPage {...props}/>} />
    <Route path="/" exact component={(props)=><PopoverPage {...props}/>} />
   
</HashRouter>), document.getElementById("root"));