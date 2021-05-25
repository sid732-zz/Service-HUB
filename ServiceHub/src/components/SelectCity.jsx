import React, { useState , useEffect } from 'react';
import axios from 'axios';

const SelectCity = ({city,onCityChange})=>{
    const [cities,setCities] = useState([]);
    useEffect(()=>{
        axios.get(`http://52.66.249.12:3002/cities`)
        .then((response)=>{
            setCities(response.data.cities);
        }).catch((err)=>{
            console.log(err);
        })
    },[]);

    return (
        <div>
            <div className="bg-black bg-opacity-60 m-5 p-4 rounded-3xl opacity-90 shadow-xl hover:shadow-2xl ">
                <img
                className="inline-block h-60 md:-mt-44 "
                src="./images/img1.png"
                    alt="Service Hub" />
                <div className=" inline-block ">
                    <img
                    className="h-24 md:h-28"
                    src="./images/mainlogo.png"
                        alt="Service Hub" />
                    <div className="text-2xl md:text-3xl ml-9 font-bold text-gray-400">Quality Home Services, On Demand</div>
                    <div className="bg-white p-2 m-4 ml-9 rounded-md grid md:grid-flow-col">
                            <h2 className=" text-1xl p-1">Where do you need service</h2>
                            <select id="drop" className="text-1xl rounded-md p-1" value={city} onChange={(e)=>onCityChange(e.target.value)}>
                                <option value="">Select Your City</option>
                                    {cities.map((option) => (
                                <option value={option.name}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-center ">
                    Our Core Services
                    </div>
                </div>
    )
}

export default SelectCity;