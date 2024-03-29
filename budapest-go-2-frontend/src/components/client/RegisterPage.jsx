import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { token } from "../token/TokenDecoder";
import  "./authentication.css";
const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [hidden, setHidden] = useState(true);
    const isMounted = useRef(true);
    useEffect(() => {
        if(token() != null){
            navigate("/home")
        }
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const HandleSubmit = async (e) => {
        e.preventDefault();
        await postRegistration(email,password);
    }
    
    
   const postRegistration = async(email, password)=>{
    fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then(response => {
            if (response.status === 200) {
                setHidden(false);
                response.text().then(messages => setMessage(messages));
                navigate("/");
            } else {
                setHidden(false);
                response.text().then(errorMessage => setMessage(errorMessage));
            }
        })
        .catch(error => console.error(error));
    };
    return (
      <div className="pageContent">
        <h1>Register</h1>
        <div hidden = {hidden}>{message}</div>
          <div>
            <form onSubmit={HandleSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email} onChange={handleEmailChange} />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
              </div>
              <button type="submit">Register</button>
              <h3 className={"link"} onClick={() =>  navigate("/")}>Registered already?</h3>
            </form>
        </div>
      </div>
    );
  };
  export default RegisterPage;