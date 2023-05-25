import React from 'react'
import './navigationBar.css'
import './elements.css'
import { email, role, time } from "../components/token/TokenDecoder";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavigationBar() {
  const navigate = useNavigate();
  const [logedInEmail, setLogedInEmail] = useState(null);
  const [privilege, setPrivilege] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  
  const handleLogout = () => {
   localStorage.clear();
   setPrivilege(null);
   setLogedInEmail(null);
   navigate("/");
}
  

  useEffect(() => {
    if (email() && role()) {
      setLogedInEmail(email());
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

  return (
    <div className='navigationBar'>
      <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
      {privilege && privilege === "EMPLOYEE" ?
      <h2 className='workspaceLabel'>workspace</h2> 
      :
      privilege && privilege === "CUSTOMER" ?
      <h2 className='workspaceLabel'>navigation</h2>
      : <></>
      }
      {logedInEmail != null ? <div className='logout'
      >
                <p 
                  onMouseEnter={() => setIsHidden(!isHidden)}
                  style={{ display: !isHidden ? "none" : "block" }}
                  >{logedInEmail}</p>
                <div style={{ display: isHidden ? "none" : "block" }}
                onMouseLeave={() => setIsHidden(!isHidden)}
                >
                <div className='box' >
                <button className='logoutButton' 
                onClick={() => handleLogout()}
                >
                  Logout
                </button>
                {privilege && privilege === "CUSTOMER" &&
                <button className='logoutButton' 
                onClick={() => navigate("/pass")}
                >
                  Pass
                </button>}
                </div>
                </div>
            </div>
            :
            <></>}
    </div>
  )
}

export default NavigationBar