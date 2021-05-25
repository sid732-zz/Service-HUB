import React,{useState} from 'react';
import {Route,Switch} from 'react-router-dom';
import ServiceList from './serviceList';
import SubServiceList from './subServiceList';
import Cart from './cart';
import Payment from './payment';
import Error from './error';

const Config = () => {
    //Routing to various components
    return (
        <Switch>
            <Route exact path="/error" component={Error}/>
            <Route exact path="/:city">
                <div>
                    <ServiceList city={city}/>
                </div>
            </Route>
            <Route exact path="/:city/:service" component={SubServiceList}/>
            <Route exact path="/:city/:service/cart" component={Cart}/>
            <Route exact path="/:city/:service/cart/bills" component={Payment}/>
        </Switch>
    );
}
export default Config;