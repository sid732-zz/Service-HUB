import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const ServiceList = ({ city }) => {
    const history = useHistory();
    const msg = city !== "" ? "" : "Please select city to continue with the services";
    const [services, setServices] = useState([]); //using the local state to store the name of services

    useEffect(() => {
        axios.get(`http://52.66.249.12:3002/all-services`)
            .then((response) => {
                setServices(response.data.services)
            }).catch((err) => {
                console.log(err);
                history.push("/server-error");
                // <Redirect to="/server-error" />
            })
    }, []);

    const getPointerEvents = () => {
        if (city !== "") {
            return { pointerEvents: "auto" };
        }
        else
            return { pointerEvents: "none" };
    }

    return (
        <>
            <div className="text-sm text-red-500 -mb-4 md:text-base text-center ">
                {msg}
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.75)", backdropFilter: "blur(3px)" }} className="w-full sm:w-11/12 md:w-3/4 sm:rounded-xl shadow-lg mx-auto my-10 relative">
                {/* list of services */}
                <ol className="py-10 w-full text-black list-none grid grid-cols-2 sm:grid-cols-4 justify-items-center content-center">
                    {services.map((s) => (
                        <li key={s.service_id} style={getPointerEvents()} className="p-3 rounded-lg font-semibold text-base md:text-xl leading-10 hover:bg-black hover:bg-opacity-30">
                            <Link to={{
                                pathname: `/services/${s.name}`,
                                state: { city }
                            }} >
                                <img className="w-14 h-14 m-auto" src={`http://52.66.249.12:3002/icons/${s.service_id}.png`} alt="" />
                                {s.name}
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
export default ServiceList;