import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useRouteMatch} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ServiceAddr = () => {
    // const {city} = useParams();
    const city = useSelector(state=>state.cart.city);
    const {url} = useRouteMatch();
    const today = new Date().toISOString().substr(0, 10);

    const legend_css = "capitalize text-3xl font-semibold text-yellow-300 text-opacity-80";
    const input_div_css = "w-full relative";
    const input_css = "w-full md:w-5/6 block border bg-transparent p-3 m-3 ml-10 font-medium text-gray-200 border-l-4 border-gray-400 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-pink-600 focus:text-pink-200 focus:bg-black focus:bg-opacity-50";
    const input_icon_css = "w-8 h-8 absolute top-1/2 bottom-1/2 transform -translate-y-1/2 opacity-60";
    const fieldset_css = "mx-5 p-5";

    const [state,setState] = useState({
        house_no:"",
        street_name:"",
        city:city,
        area:"",
        pin:"",
        date:today
    });

    
    const [check, setCheck] = useState(`${url}`);


    const [areas,setAreas] = useState([])

    useEffect(()=>{
        axios.get(`http://52.66.249.12:3002/city-service-details?city=${city}`)
        .then((response)=>{
            setAreas(response.data.city.available_areas)
        }).catch((err)=>{
            console.log(err);
        })
    },[]);

    const houseNumberHandler = (evt)=>{
        setState({...state, house_no:evt.target.value});
    }
    const streetNameHandler = (evt)=>{
        setState({...state, street_name:evt.target.value});
    }
    const areaHandler = (evt)=>{
        let a = areas.filter((a)=>a.area === evt.target.value);
        setState({...state, area:evt.target.value, pin: a[0].pin});
    }
    // const pinHandler = (evt)=>{
    //     setState({...state, pin:evt.target.value});
    // }
    const dateHandler = (evt)=>{
        setState({...state,date:evt.target.value});
    }

    const handleClick = ()=>{
        
        if(state.house_no.trim().length>2 && state.street_name.trim().length>4 && state.area.length!==0)
           setCheck(`${url}/payment`);
        else
            alert("Please enter correct address to place order");
    }
    
    return (
    <div style={{background:`linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("../../bg_images/service_addr.jpg")`}} className="w-full lg:w-1/2 p-5 clear-left lg:clear-none lg:float-right rounded-lg bg-cover">
    <form className="">
        <fieldset className={fieldset_css}><legend className={legend_css}>Service Address</legend>
            <div className={input_div_css}>
                <img className={input_icon_css} src={"../images/icons/home.png"} alt=""/>
                <input type="text" placeholder="Enter House Number" value={state.house_no} onChange={houseNumberHandler} required minLength="3" maxLength="10"
                className={input_css}/>
            </div>
            <div className={input_div_css}>
                <img src={"../images/icons/street.png"} alt="" className={input_icon_css}/>
                <input type="text" placeholder="Enter Street Name" value={state.street_name} onChange={streetNameHandler} required minLength="5" maxLength="25"
                className={input_css}/>
            </div>
            <div className={input_div_css}>
                <img src={"../images/icons/city.png"} alt="" className={input_icon_css}/>
                <select disabled className={input_css} style={{appearance:"none"}}>
                    <option value="{city}">{city}</option>
                </select>
            </div>
            <div className={input_div_css}>
                <img src={"../images/icons/area.png"} alt="" className={input_icon_css}/>
                <select className={input_css} value={state.area} onChange={areaHandler} required
                    style={{appearance:"none"}}>
                    <option value="" disabled >Select Area</option>
                    {areas.map((a)=>(
                        <option value={a.area} className="bg-black text-white hover:bg-white hover:text-black">{a.area}</option>
                    ))}
                </select>
            </div>
            <div className={input_div_css}>
                <img src={"../images/icons/pin.png"} alt="" className={input_icon_css}/>
                <input disabled type="text" placeholder="Enter Pin Code" value={state.pin} required maxLength="6" pattern="\d{6}"
                className={input_css}/>
            </div>
        </fieldset>
        <fieldset className={fieldset_css}><legend className={legend_css}>Service Date</legend>
            <div className={input_div_css}>
                <img src={"../images/icons/date.png"} alt="" className={input_icon_css}/>
                <input type="date" className={input_css} value={state.date} min={today} onChange={dateHandler}/>
            </div>
        </fieldset>
    

        <Link onClick={handleClick} to={{
            pathname:  check,
            state: state
        }} className="float-right rounded-full bg-yellow-300 bg-opacity-80 text-black font-semibold p-3 transition transform hover:scale-110 hover:text-lg">
            <span className="">Place Order</span>
            <svg width="25" height="25" className="inline p-1 stroke-1 stroke-current fill-current">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
        </Link>
    </form>
    </div>
    );
}
export default ServiceAddr;