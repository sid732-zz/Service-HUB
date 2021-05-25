import React from 'react'

function History(props) {
    const { order } = props;
    const { delivery_address } = order;
  
    return (
        <div className="order ">
            <h5>Order id: {order.order_id}</h5>
            <h5>Order Date: {order.date_service}</h5>
            <h5>Service Type: {order.service_name}</h5>
            <h5>Address: {delivery_address.houseNumber},{delivery_address.street},{delivery_address.area},{delivery_address.city},{delivery_address.pinCode}.</h5>
            <span className="a-span">
            <h3 className="ah3">Total Bill: &#x20B9; {order.total_cost}</h3> 
            <h2 className="completed ah2">{order.status}</h2>
            </span>
        </div>
    );
}

export default History;