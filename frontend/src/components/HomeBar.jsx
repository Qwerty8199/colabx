import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const [activeTab, setActiveTab] = useState("Home");
    // const [visibleComponent, setVisibleComponent] = useState("MainDashboard");
  
    const handleTabClick = (tab) => {
        console.log(tab)
      setActiveTab(tab);
    //   setVisibleComponent(tab);
    };

  return (
    <nav className='flex justify-between items-center px-4 py-2 bg-gray-100'>
    <ul className='flex space-x-4'>
        <li className={`px-4 py-2 ${activeTab === "home" ? 'border-b-2 border-gray-800' : ''}`}>
        <NavLink to="/home" className={`text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out`} onClick={() => handleTabClick('home')}>
        Home
        </NavLink>
        </li>
        <li className={`px-4 py-2 ${activeTab === "data" ? 'border-b-2 border-gray-800' : ''}`}>
        <NavLink to="/data" className={`text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out`} onClick={() => handleTabClick('data')}>
            DataDashboard
        </NavLink>
        </li>
    </ul>
    <div className="flex items-center space-x-4">
    <NavLink to="/profile" className={`text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out`} onClick={() => handleTabClick('data')}>
            Profile
        </NavLink>
        {/* <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out">Profile</span>
        <span className="w-16 h-16 rounded-full bg-orange-500" /> */}
        
    </div>
    </nav>
  );
}


export default Navbar;