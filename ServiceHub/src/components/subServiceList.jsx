import React, { useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, subQuantity, addQuantity, updateTotal } from '../redux/cart/cartActions';

const SubServiceList = () => {
    const { service } = useParams(); //getting the city & service name from props passed
    const city = useLocation().state.city;
    const history = useHistory();
    // console.log(city,useLocation());

    const services = useSelector(state => state.cart.services); //getting the state from redux-store
    const total_bill = useSelector(state => state.cart.total_bill);
    const service_type = useSelector(state => state.cart.service_type);
    const city_selected = useSelector(state => state.cart.city);
    const dispatch = useDispatch(); //getting the dispatcher

    useEffect(() => {
        if (city !== city_selected || service !== service_type) {
            axios.get(`http://52.66.249.12:3002/city-sub-service-details?city=${city}&service=${service}`)
                .then((response) => {
                    const services = response.data['sub_services'].map(sub =>
                        ({ ...sub, selected: false, quantity: 0 })
                    )
                    const new_service_type = response.data.sub_services[0].service;
                    const new_city = response.data.city_name;
                    dispatch(addToCart(services, new_service_type, new_city));
                }).catch((err) => {
                    console.log(err);
                    history.push("/server-error");
                })
        }
        else {
            return;
        }
    }, []);

    return (
        <>
            <div class="bg1"></div>
            <div class="bg1 bg2"></div>
            <div class="bg1 bg3"></div>
            {/* <div style={{ backgroundImage: `url(../bg_images/service_details.jpg)` }} className="bg-cover bg-fixed"> */}
                <div className="fixed top-15 lg:right-5 w-full lg:w-auto h-10 bg-black lg:bg-transparent z-10">
                    {(total_bill !== 0 && total_bill !== undefined) && <Link to={"/cart"} className="float-right">
                        <div className="mr-5 text-white text-lg font-semibold hover:text-red-500 transition duration-200 transform hover:scale-110">
                            <span className="leading-3 align-middle">Proceed to Cart</span>
                            <svg className="inline ml-2 fill-current stroke-1 stroke-current" width="16" height="16" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </Link>
                    }
                    {/* <Link to={"/"} className="float-left">
                <div className="ml-5 text-white text-lg font-semibold hover:text-red-500">
                    <svg className="inline mr-2 fill-current stroke-1 stroke-current" width="16" height="16" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <span className="leading-3 align-middle">Back to Home</span>
                </div>
            </Link> */}
                </div>
                {/* for creating the grid layout of all the services */}
                <div className="grid grid-cols-1 w-screen sm:w-2/3 lg:w-5/12 mx-auto relative z-0">
                    {services.map((d) => (
                        //individual card layout
                        <div key={d.sub_service_id} className="bg-gray-900 bg-opacity-95 shadow-xl m-5 rounded-xl transiton duration-300 transform border-b-4 border-transparent hover:-rotate-1 hover:border-yellow-500 hover:scale-105">
                            <img className="opacity-75 rounded-t-xl w-full min-h-72 max-h-96" src={`http://52.66.249.12:3002/images/${d.sub_service_id}.jpg`} alt="" />
                            {/* contains the service name & add to cart options */}
                            <div className="p-3 text-gray-200">
                                <span className="w-2/3 float-left text-2xl font-semibold">{d.sub_service_name}</span>
                                <span className="flex float-right w-1/4 text-center p-1.5 space-x-0.5 text-lg text-gray-100">
                                    <button onClick={() => { dispatch(subQuantity(d.sub_service_id)); dispatch(updateTotal()) }} className="flex-grow font-bold bg-gray-500 focus:outline-none hover:bg-gray-100 hover:text-gray-900">-</button>
                                    <span className="flex-grow font-medium bg-gray-500 select-none focus:outline-none">{d.quantity}</span>
                                    <button onClick={() => { dispatch(addQuantity(d.sub_service_id)); dispatch(updateTotal()) }} className="flex-grow font-bold bg-gray-500 focus:outline-none hover:bg-gray-100 hover:text-gray-900">+</button>
                                </span>
                            </div>
                            {/* contains the price & rating of the services */}
                            <div className="pl-3 pb-3 clear-both">
                                <span className="text-md font-semibold tracking-wide leading-3 align-text-bottom text-gray-200 tabular-nums">&#x20B9;{d.sub_service_cost}</span>
                                <span className="text-yellow-500 font-semibold text-sm ml-5">
                                    <svg width="20" height="20" fill="currentColor" className="inline">
                                        <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                                    </svg>
                                    <span className="align-text-bottom leading-3">{d.rating}</span>
                                </span>
                            </div>
                            {/* contains the details provided of the services */}
                            <div className="pl-10 pb-3 text-sm text-gray-200 opacity-75">
                                <ul className="list-outside ">
                                    {
                                        d.description.map(det => (
                                            <li className="list-disc">{det}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            {/* </div> */}



        </>
    );

}
export default SubServiceList;