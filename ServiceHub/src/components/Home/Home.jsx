import React, { useState } from 'react'
import Poster from './Poster'
import Review from './Review'
import SelectCity from '../SelectCity'
import ServiceList from '../serviceList'

export default function Home() {
    const [city,setCity] = useState("");
    const handleCityChange = (data)=>{
        // console.log(data);
        setCity(data);
      }
    return (
        <div>
            <SelectCity city={city} onCityChange={handleCityChange}/>
            <ServiceList city={city}/>
            <div className="h-3 bg-white bg-opacity-80"></div>
            <Poster/>
            <div className="h-3 bg-white bg-opacity-80"></div>
            <Review />
        </div>
    )
}
