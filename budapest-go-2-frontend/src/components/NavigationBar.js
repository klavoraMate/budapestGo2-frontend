import React from 'react'
import './navigationBar.css'
import './elements.css'
import { email, role, time } from "./token/TokenDecoder";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DropMenu from "./elements/dropMenu/DropMenu";

function NavigationBar() {
  const [privilege, setPrivilege] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
   localStorage.clear();
   setPrivilege(null);
   navigate("/");
}

  useEffect(() => {
    if (email() && role()) {
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
    ["Types and prices", () => navigate("purchase")],
  ];

  const mapMenuContent = [
    ["Map", () => navigate("/map")]
  ];
  const newsMenuContent = [
    ["News", () => navigate("/home")]
  ];

  if (privilege === "CUSTOMER")
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

  const workspaceMenuContent = [
    ["Workspace", null],

    ["Home", () => navigate("/workspace")],

    ["Transportation", null],

    ["Create route", () => navigate("/route/add")],
    ["Modify route", () => navigate("/route/edit")],
    ["Create stop", () => navigate("/stop/add")],
    ["Modify stop", () => navigate("/stop/edit")],

    ["Transportation", null],

    ["Create pass", () => navigate("/category/add")],
    ["Modify pass", () => navigate("/category/edit")],

    ["Content", null],

    ["Create article", () => navigate("/news/add")],
    ["Modify article", () => navigate("/news/edit")],
  ]

  const mapEmployeeMenuContent = [
    ["Customer", null],

    ["Map", () => navigate("/map")]
  ];

  if (privilege === "EMPLOYEE")
    return (
      <div className='navigationBar'>
        <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
        <div className={"left-content"}>
          <DropMenu title={"Navigation"} content={mapEmployeeMenuContent}/>
          <DropMenu title={"Workspace"} content={workspaceMenuContent}/>
        </div>
        <div className={"right-content"}>
          <DropMenu title={email()} content={userMenuContent}/>
        </div>
      </div>
    )

  const loginMenuContent = [
    ["Log-in", () => navigate("/")],
    ["Register", () => navigate("/register")],
  ];

    return (
      <div className='navigationBar'>
        <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
        <div className={"right-content"}>
          <DropMenu title={"Login"} content={loginMenuContent}/>
        </div>
      </div>
    )
}

export default NavigationBar