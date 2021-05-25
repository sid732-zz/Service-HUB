import React from 'react';
import Services from './Services';
import {Redirect} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addQuantity, emptyCart, removeFromCart, subQuantity, updateTotal } from '../../redux/cart/cartActions';

import '../../styles/cart_styles.css';

function Summary() {
    const state = useSelector(state => state.cart.services.filter((service)=> service.selected));
    const dispatch = useDispatch();
    let total_bill = useSelector(state => state.cart.total_bill);
    
    return( <>{total_bill===0 && <>{alert("Cart Empty")} <Redirect to="/"/></>}
    <main className="a-block summary a-main">
     <div className="row ">
         <h2 className="a-h2"><u>Cart Summary</u></h2>
         <button className="float-right rounded-full bg-red-500 bg-opacity-90 text-white font-semibold p-3 transition transform hover:scale-110 hover:text-lg" onClick={()=>dispatch(emptyCart())}>
            <img className="empty-image" src={"../images/icons/open-dustbin.png"} alt=""/>  
            Empty Cart
         </button>
     </div>
     <div className="bg">
     <div className="col">
         <table style={{textAlign:"center"}}>
             <tr>
             <th width="50%">Sub-services</th>
             <th width="5%"> </th>
             <th width="5%">Quantity</th>
             <th width="5%"> </th>
             <th width="25%">Price</th>
             <th width="5%"> </th>
             </tr>
            {state.map((service)=> (
                <Services id={service.sub_service_id} serviceName={service.sub_service_name} servicePrice={service.sub_service_cost} 
                addQuantity={()=>{dispatch(addQuantity(service.sub_service_id)); dispatch(updateTotal())}}
                subQuantity={()=>{dispatch(subQuantity(service.sub_service_id)); dispatch(updateTotal())}}
                quantity={service.quantity} removeService={()=>{dispatch(removeFromCart(service.sub_service_id)); dispatch(updateTotal())}}
                ></Services>
            ))}
         </table>
     </div>
     <hr className="a-hr"/>
     <div className="row price">
     <h4>Total price</h4>
     <h4>&#x20B9;{total_bill}</h4>
     </div>
     </div>
     {/* <div class="row check">
         <button className="checkout">Checkout</button>
     </div> */}
    </main></>
    );
}

export default Summary
