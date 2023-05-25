import { email, role } from "./token/TokenDecoder";
import { useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import './navigationBar.css'
import './elements.css'

function NavigationBar() {
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [privilege, setPrivilege] = useState(null);
  const navigate = useNavigate();
  const emailIndicator = useRef(null);
  const optionsMenu = useRef(null);

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
      } 
  },[email(), role()]);

  const a = [["logout", () => handleLogout()],
    ["logout", () => handleLogout()],
    ["logout", () => handleLogout()],
    ["logout", () => handleLogout()],
    ["logout", () => handleLogout()]
  ];
  console.log(a[0][0])
  return (
    <div className='navigationBar'>
      <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />

      <div className={"menu"}>

        <div className={"email"} onMouseEnter={() => setIsHidden(true)}>
          {!isHidden && <p>{email()}</p>}
        </div>

        <div onMouseLeave={() => setIsHidden(false)}>
          {isHidden && <div className={"box"}>{a.map((option) => <button onClick={option[1]} className={"menuButton"}>{option[0]}</button>)}</div>}
        </div>

      </div>
    </div>
  )
}

export default NavigationBar