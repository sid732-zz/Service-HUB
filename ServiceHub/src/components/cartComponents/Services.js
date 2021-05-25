import React from 'react';

function Services(props) {
    const service = props;
    const buttonStyle = {
        "font-size": "1rem",
        "padding": "0.2rem",
        "margin": "0.1rem",
        "border-radius": "0.5rem",
        "border": "0.1rem #404040 solid",
        "background-color": "rgb(65, 66, 66)",
        "width": "1.5rem",
        "cursor": "pointer",
        "color": "white",
        "font-weight": "bold",
        "opacity": "50%",
        "margin": "0rem",
        "border-radius": "0.35rem"
    }
    const removeStyle = {
        "font-size": "1rem",
        "padding": "0.2rem",
        "width": "1.5rem",
        "cursor": "pointer",
        "color": "white",
        "font-weight": "bold",
        "opacity": "50%",
        "margin": "0rem",
        "border-radius": "0.35rem",
         "background-color": "rgba(235,38,38,1)",
        "opacity": "80%",
        "border": "none",
        "font-weight": "lighter"
    }
    return (
        <React.Fragment >
            <tr>
                <td>{service.serviceName}</td>
                <td><button style={buttonStyle} onClick={service.subQuantity}>-</button></td>
                <td>{service.quantity}</td>
                <td><button style={buttonStyle} onClick={service.addQuantity}>+</button></td>
                <td>{service.servicePrice}</td>
                <td><button style={removeStyle} onClick={service.removeService}>X</button></td>
            </tr>
        </React.Fragment>
    )
}
export default Services;
