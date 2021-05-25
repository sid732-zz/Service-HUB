import React from 'react'
import { useDispatch } from 'react-redux';
import firebase from '../firebase';
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from 'react-redux'
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { setUserLogOutState } from '../redux/user/userActions';

export default function Header() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userEmail)
    const handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                dispatch(setUserLogOutState())
            }).catch((err) => alert(err.message))
        localStorage.removeItem('user');
    };
    return (
        <div className="z-10 bg-gray-800 bg-opacity-90 h-14 mx-auto text-base md:text:xl text-left sticky top-0">
            <Link to="/">
                <img
                    className="inline-block m-0.5 h-12 w-auto"
                    src="./images/mainlogo.png"
                    alt="Service Hub" />
            </Link>
            {/*only for large medium screen */}
            <nav className="hidden md:inline-block m-4 absolute right-0 space-x-8">
                <Link className="text-gray-300 hover:text-white p-2  hover:bg-gray-700 rounded-md font-bold" to="/register-as-professional">Registration As A Professional</Link>
                {
                    (!user) ?
                        <Link className="text-gray-300 hover:text-white p-2  hover:bg-gray-700 rounded-md font-bold" to="/Email">Login/Sign Up</Link>
                        : <><Link className="text-gray-300 hover:text-white p-2  hover:bg-gray-700 rounded-md font-bold" to="/" onClick={handleLogout}>Sign Out</Link>
                            <Link className="text-gray-300 hover:text-white p-2  hover:bg-gray-700 rounded-md font-bold" to="/orders">My Orders</Link>
                        </>
                }
            </nav>
            <div className="inline-block md:hidden m-2 absolute right-0 space-x-8">
                <Menu as="div" className="relative inline-block text-left">
                    {({ open }) => (
                        <>
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2  text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    Menu
                            <ChevronDownIcon
                                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute right-0 w-64 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            <Link to="/register-as-professional" className="group flex rounded-md items-center w-full px-2 py-2 text-base focus:bg-gray-300 hover:bg-gray-300">
                                                Registration As A Professional </Link>
                                        </Menu.Item>

                                        {
                                            (!user) ?
                                                <Menu.Item><Link className="group flex rounded-md items-center w-full px-2 py-2 text-base focus:bg-gray-300 hover:bg-gray-300" to="/Email">Login/Sign Up</Link></Menu.Item>
                                                : <><Menu.Item><Link className="group flex rounded-md items-center w-full px-2 py-2 text-base focus:bg-gray-300 hover:bg-gray-300" to="/" onClick={handleLogout}>Sign Out</Link></Menu.Item>
                                                    <Menu.Item><Link className="group flex rounded-md items-center w-full px-2 py-2 text-base focus:bg-gray-300 hover:bg-gray-300" to="/orders">My Orders</Link></Menu.Item>
                                                </>
                                        }
                                         <Menu.Item>
                                            <Link to="/about" className="group flex rounded-md items-center w-full px-2 py-2 text-base focus:bg-gray-300 hover:bg-gray-300">
                                                About Us </Link>
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    )
}
