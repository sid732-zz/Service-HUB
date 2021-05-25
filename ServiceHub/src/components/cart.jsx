import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import ServiceAddr from './cartComponents/serviceAddress';
import Summary from './cartComponents/Summary';

const Cart = () => {
    const userEmail = useSelector(state => state.user.userEmail);
    return (
        <>
        {userEmail == null && <Redirect to="/email" />}
    <div style={{backgroundImage:`url(../../bg_images/cart.jpg)`}} className="bg-cover bg-fixed p-3 lg:flex">
        <Summary/>
        <ServiceAddr/>
    </div>
    </>
    );
}
 
export default Cart;