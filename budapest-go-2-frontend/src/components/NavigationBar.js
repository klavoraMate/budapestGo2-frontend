import React from 'react'
import './navigationBar.css'
import './elements.css'
import{ getCookie, deleteCookie } from "../components/cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavigationBar() {
  const navigate = useNavigate();
  const [emailCookie, setEmailCookie] = useState(null);
  const [privilegeCookie, setPrivilegeCookie] = useState(null);
  const [idCookie, setIdCookie] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  const navigateTo = (urlEnd) => {
      navigate(urlEnd);
  };

  const handleLogout = () => {
    deleteCookie("email");
    deleteCookie("privilege");
    deleteCookie("id");
    setEmailCookie(null);
    setPrivilegeCookie(null);
    setIdCookie(null);
}

  useEffect(() => {
      const email = getCookie("email");
      const privilege = getCookie("privilege");
      const id = getCookie("id");
      if (email && privilege) {
          console.log(id);
          setEmailCookie(email);
          setPrivilegeCookie(privilege);
          setIdCookie(id);
      }
  }, []);

  return (
    <div className='navigationBar'>
      <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
      <h2 className='workspaceLabel'>workspace</h2>
      {getCookie("id") ? <div className='logout'
      >
                <p 
                  onMouseEnter={() => setIsHidden(!isHidden)}
                  style={{ display: !isHidden ? "none" : "block" }}
                  >{getCookie("email")}</p>
                <div style={{ display: isHidden ? "none" : "block" }}
                onMouseLeave={() => setIsHidden(!isHidden)}
                >
                <div /* className='box' */>
                <button className='logoutButton' 
                onClick={() => handleLogout()}
                >
                  Logout
                </button>
                </div>
                </div>
            </div>
            :
            <div className='logout'>
            <button className="login" onClick={() => navigateTo('./login')}>Login</button>
            </div>}
    </div>
  )
}

export default NavigationBar