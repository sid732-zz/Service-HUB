import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import axios from 'axios';


const BillDetails = () => {
    const services = useSelector(state => state.cart.services.filter(s => s.selected)); //getting the state from redux-store
    const total_bill = useSelector(state => state.cart.total_bill);
    const { state } = useLocation();


    let today = new Date().toISOString().substr(0, 10);
    // let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    return (
        <>
      
        {total_bill === 0 &&  <Redirect to="/" />}
            <div className="lg:w-1/2 lg:float-left sm:p-5 sm:pt-10">
                <div className="border-2 border-gray-400 sm:grid sm:grid-cols-2 text-gray-100 backdrop-filter backdrop-blur-sm">
                    <div className="p-2">
                        <span className="block font-semibold text-lg">Service Address :</span>
                        <span className="">{state.house_no}, {state.street_name},</span><br />
                        <span>{state.area}, {state.city}</span><br />
                        <span>Pin : {state.pin}</span>
                    </div>
                    <div className=" p-2 sm:text-right sm:justify-self-end">
                      
                       
                        <span className="font-semibold text-lg">Order Date : </span>
                        <span>{today}</span><br />
                        <span className="font-semibold text-lg">Service Date : </span>
                        <span>{state.date}</span>
                    </div>
                </div>
                <table className="w-full my-10 bg-gray-100 rounded-lg">
                    <thead className="text-blue-600 font-semibold text-lg uppercase">
                        <tr className="border-b-2 border-gray-800">
                            <td className="p-3">Service</td>
                            <td className="text-right p-3">Price</td>
                            <td className="text-right p-3">Qty</td>
                            <td className="text-right p-3">Amount</td>
                        </tr>
                    </thead>
                    <tbody className="">
                        {services.map((s) => (
                            <tr className="">
                                <td className="w-1/2 p-3">{s.sub_service_name}</td>
                                <td className="text-right p-3">{s.sub_service_cost}</td>
                                <td className="text-right p-3">{s.quantity}</td>
                                <td className="text-right p-3 font-semibold">{s.sub_service_cost * s.quantity}</td>
                            </tr>
                        ))}
                        <tr className="text-right text-xl font-semibold border-t-2 border-gray-800">
                            <td></td><td></td>
                            <td className="p-3 text-white bg-gray-700">TOTAL</td>
                            <td className=" p-3 text-white bg-gray-700 rounded-br-lg">&#x20B9; {total_bill}</td>
                        </tr>
                    </tbody>
                </table>
            </div></>
    );
}

const PaymentOptions = () => {
    const { state } = useLocation();
    const services = useSelector(state => state.cart.services.filter(s => s.selected));

    const total_bill = useSelector(state => state.cart.total_bill);

    const allDetails = {
        service_name: services[0].service,
        delivery_address: {
            houseNumber: state.house_no,
            street: state.street_name,
            area: state.area,
            city: state.city,
            pinCode: state.pin
        },
        date_service: state.date,
        sub_services: [...services],
        total_cost: total_bill
    }

    const [redirect, setRedirect] = useState(false);

    const [paymentDetails, setPaymentDetails] = useState({
        mode: "online",
        type: "card",
    });
    const [cardDetails, setCardDetails] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: ""
    });
    const [bankDetails, setBankDetails] = useState({
        bank: ""
    });
    const [upiID, setUpiID] = useState({
        upi: ""
    });

    const changeMode = (evt) => {
        const type = evt.target.value === "online" ? "card" : "";
        setPaymentDetails({ ...paymentDetails, mode: evt.target.value, type: type });
    }
    const changeType = (evt) => {
        setPaymentDetails({ ...paymentDetails, type: evt.target.value });
    }

    const nameHandler = (evt) => {
        setCardDetails({ ...cardDetails, name: evt.target.value });
    }
    const cardNumberHandler = (evt) => {
        setCardDetails({ ...cardDetails, number: evt.target.value });
    }
    const expiryHandler = (evt) => {
        setCardDetails({ ...cardDetails, expiry: evt.target.value });
    }
    const cvvHandler = (evt) => {
        setCardDetails({ ...cardDetails, cvv: evt.target.value });
    }
    const changeBankName = (evt) => {
        setBankDetails({ ...bankDetails, bank: evt.target.value });
    }

    const upiHandler = (evt) => {
        setUpiID({ ...upiID, upi: evt.target.value });
    }



    const postOrder = () => {
        // try {
            console.log(allDetails);
            const userData = JSON.parse(localStorage.getItem('user'));
            const token = userData.stsTokenManager.accessToken

            const headers= {
                    // 'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
           

            axios.post('http://52.66.249.12:3002/place-order', allDetails, {headers: headers}).
            then(res => setRedirect(true)).
            catch(error => alert('There was some error processing your payment'));

            

        // } catch (error) {
        //     console.log("Error From Server: " + error.message);
        // }

    }


    const pay_mode = "p-3 sm:mr-10 ml-1 text-lg text-white font-semibold";
    const bank_choice = "p-1 sm:mr-5 ml-1 pl-5";
    const online_type = "p-1 sm:mr-5 ml-1";
    const input_cls = "bg-transparent p-2 border-2 border-white w-full focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 focus:bg-opacity-100";
    const label_cls = "mt-2 mb-1 block uppercase text-md";
    const payment_div = "p-1 md:p-5";

    return (
        <>
            {
                redirect && <Redirect to="/orders" />
            }
            <div className="lg:w-1/2 m-auto bg-transparent lg:float-right text-white text-opacity-75 lg:border-l-2 lg:border-blue-600 ">
                <form action="" className="text-center mt-5">
                    <input type="radio" name="pay_option" value="online" checked={paymentDetails.mode === "online"} onChange={changeMode} /><span className={pay_mode}>Pay Online</span>
                    <input type="radio" name="pay_option" value="cod" checked={paymentDetails.mode === "cod"} onChange={changeMode} /><span className={pay_mode}>Pay On Delivery</span>
                </form>
                {
                    paymentDetails.mode !== "" && <div style={{ minHeight: "30rem" }} className="backdrop-filter backdrop-brightness-50 border-2 border-green-400 m-0 sm:m-5 relative">
                        {
                            paymentDetails.mode === "online" && <form action="" className="m-2 sm:m-5">
                                <input type="radio" name="online_pay" value="card" checked={paymentDetails.type === "card"} onChange={changeType} /><span className={online_type}>Credit/Debit Card</span>
                                <input type="radio" name="online_pay" value="netb" checked={paymentDetails.type === "netb"} onChange={changeType} /><span className={online_type}>Net Banking</span>
                                <input type="radio" name="online_pay" value="upi" checked={paymentDetails.type === "upi"} onChange={changeType} /><span className={online_type}>UPI</span>
                            </form>
                        }
                        {
                            paymentDetails.type === "card" && <div className={payment_div}>
                                <form action="" className="sm:grid sm:grid-cols-5 sm:m-5">
                                    <div className="sm:col-span-5 mb-2">
                                        <label htmlFor="name" className={label_cls}>Name on the Card</label>
                                        <input name="name" type="text" autoComplete="off" className={input_cls} value={cardDetails.name} onChange={nameHandler} />
                                    </div>
                                    <div className="sm:col-span-5 mb-2">
                                        <label htmlFor="card_no" className={label_cls}>Card Number</label>
                                        <input name="card_no" type="text" autoComplete="off" maxLength="16" pattern="[0-9]{16}" className={input_cls} value={cardDetails.number} onChange={cardNumberHandler} />
                                    </div>
                                    <div className="sm:col-span-3 mb-2">
                                        <label htmlFor="expiry" className={label_cls}>Expiry Date</label>
                                        <input name="expiry" type="text" autoComplete="off" className={input_cls} value={cardDetails.expiry} onChange={expiryHandler} />
                                    </div>
                                    <div className="sm:col-span-2 mb-2">
                                        <label htmlFor="cvv" className={label_cls}>CVV Number</label>
                                        <input name="cvv" type="password" autoComplete="off" maxLength="3" pattern="[0-9]{3}" className={input_cls} value={cardDetails.cvv} onChange={cvvHandler} />
                                    </div>
                                </form></div>
                        }
                        {
                            paymentDetails.type === "netb" && <div className={payment_div}>
                                <form action="" className="m-2 sm:m-5">
                                    <label htmlFor="bank_name" className={label_cls}>Choose Your Bank</label>
                                    <input type="radio" name="bank_name" value="axis" checked={bankDetails.bank === "axis"} onChange={changeBankName} /><span className={bank_choice}>Axis Bank</span><br />
                                    <input type="radio" name="bank_name" value="icici" checked={bankDetails.bank === "icici"} onChange={changeBankName} /><span className={bank_choice}>ICICI Bank</span><br />
                                    <input type="radio" name="bank_name" value="sbi" checked={bankDetails.bank === "sbi"} onChange={changeBankName} /><span className={bank_choice}>State Bank of India</span><br />
                                    <input type="radio" name="bank_name" value="hdfc" checked={bankDetails.bank === "hdfc"} onChange={changeBankName} /><span className={bank_choice}>HDFC Bank</span><br />
                                    <input type="radio" name="bank_name" value="pnb" checked={bankDetails.bank === "pnb"} onChange={changeBankName} /><span className={bank_choice}>Punjab National Bank</span><br />
                                    <input type="radio" name="bank_name" value="yes" checked={bankDetails.bank === "yes"} onChange={changeBankName} /><span className={bank_choice}>Yes Bank</span><br />
                                </form></div>
                        }
                        {
                            paymentDetails.type === "upi" && <div className={payment_div}>
                                <form action="">
                                    <label className={label_cls} htmlFor="upi_id">Enter Your UPI ID</label>
                                    <input type="email" name="upi_id" value={upiID.upi} className={input_cls} onChange={upiHandler} />
                                </form></div>
                        }
                        {
                            paymentDetails.mode === "cod" && <div className={payment_div}>
                                <h2 className="text-center text-lg">You have to Pay the bill on delivery</h2>
                            </div>
                        }
                        <button onClick={postOrder} className="absolute w-1/2 p-2 bg-green-400 text-black text-lg font-semibold focus:outline-none left-1/2 bottom-1 sm:bottom-5 transform -translate-x-1/2" >
                            {paymentDetails.mode === "cod" ? "CONTINUE" : "PAY"}</button>
                    </div>
                }
            </div>
        </>
    )
}

const Payment = () => {
    
    const userEmail = useSelector(state => state.user.userEmail);

    return (
        <>
        {userEmail == null && <Redirect to="/email" />}
        
        <div className="bg-cover bg-fixed p-1 lg:flex" style={{ background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(../bg_images/payment.jpg)` }}>
            <BillDetails />
            <PaymentOptions />
        </div>
        </>
    );
}

export default Payment;