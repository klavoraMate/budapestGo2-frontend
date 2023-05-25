import React from 'react'
import './navigationBar.css'
import './elements.css'
import { email, role, time } from "./token/TokenDecoder";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DropMenu from "./elements/dropMenu/DropMenu";

function NavigationBar() {
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [privilege, setPrivilege] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
   localStorage.clear();
   setPrivilege(null);
   setLoggedInEmail(null);
   navigate("/");
}

  useEffect(() => {
    if (email() && role()) {
      setLoggedInEmail(email());
      setPrivilege(role());

      const targetDate = new Date(time());
      const currentDate = new Date();
      if (currentDate > targetDate) {
          handleLogout();
      }
      const timeout = setTimeout(() => {
          handleLogout();
      }, 2 * 60 * 60 * 1000);
    }


  },[email(), role()]);

  const userMenuContent = [
    ["Log-out", () => handleLogout()],
    ["Settings", () => console.log("//TODO: Implement settings")],
  ];

  const passMenuContent = [
    ["Types and prices", () => handleLogout()],
  ];

  const mapMenuContent = [
    ["Map", () => navigate("/map")]
  ];
  const newsMenuContent = [
    ["News", () => navigate("/news")]
  ];

  return (
    <div className='navigationBar'>
      <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
      <div className={"left-content"}>
          <DropMenu title={"Navigation"} content={mapMenuContent}/>
          <DropMenu title={"Passes"} content={passMenuContent}/>
          <DropMenu title={"News"} content={newsMenuContent}/>
      </div>
      <div className={"right-content"}>
        <DropMenu title={email()} content={userMenuContent}/>
      </div>
    </div>
  )
}

export default NavigationBar