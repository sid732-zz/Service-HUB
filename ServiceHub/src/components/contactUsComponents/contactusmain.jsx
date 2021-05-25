import React, { useState } from 'react';
import cities from './data';
import Faqmain from '../faqComponents/faqmain';


function Contactusmain() {
    const [city, showcity] = useState(cities);
    return (

        <div>
            <div class="bg1"></div>
            <div class="bg1 bg2"></div>
            <div class="bg1 bg3"></div>

            <div class="p-3">
                <h2 class=" text-center text-4xl font-bold ">Contact Us</h2><br>
                </br>

            </div>
            <div class="gap-4 ml-8 mr-8 p-3 grid sm:grid-cols-1 md:grid-cols-3 grid-rows-3  ">
                {city.map((cities) => {

                    return <div class=" bg-red-200 h-40 rounded-xl">
                        <div class="  text-xl font-bold card h-1/3 text-center" >
                            <h4> {cities.city} </h4>
                        </div>

                        <div class="text-center rounded-xl bg-white h-2/3">
                            {cities.address}
                        </div>
                    </div>
                })}

            </div>

            <div >
                <Faqmain />
            </div>

        </div>
    )
}


export default Contactusmain;
