import React from 'react'
import Home from "./Home/Home";
import AboutUs from "./AboutUs";
import PrivacyPolicy from "./PrivacyPolicy";
import Contactusmain from './contactUsComponents/contactusmain';
import Email from './Email';
import Mobile from './Mobile';
import RegisterAsProfessional from './RegisterAsProfessional';
import SubServiceList from './subServiceList';
import Cart from './cart';
import Payment from './payment';
import {ServerError,Error404} from './error';
import OrderHistory from './OrderHistory';

import { Switch, Route } from "react-router-dom";

export default function Main() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/about" component={AboutUs} />
                <Route exact path="/policy" component={PrivacyPolicy} />
                <Route exact path="/contact" component={Contactusmain} />
                <Route exact path="/email" component={Email} />
                <Route exact path="/mobile" component={Mobile} />
                <Route exact path="/register-as-professional" component={RegisterAsProfessional}/>
                <Route exact path="/server-error" component={ServerError}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/cart/payment" component={Payment}/>
                <Route exact path="/services/:service" component={SubServiceList}/>
                <Route exact path="/orders" component={OrderHistory}/>
                
                <Route path="*" component={Error404}/>
            </Switch>
        </div>
    )
}
