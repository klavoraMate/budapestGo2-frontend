import React, { useState, useRef, useEffect } from "react";
import{getCookie,isCookieAdequette} from "../components/cookie";
import { useNavigate } from "react-router-dom";
import  "./LoginPage.css";
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isMounted = useRef(true);
    const navigate = useNavigate()

    const navigateTo = (urlEnd) => {
        navigate(urlEnd);
    };

    useEffect(() => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await
            await fetch('/client/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

        if (response.ok) {
            if(isCookieAdequette("EMPLOYEE")){
                navigateTo("/workspace")
            }
            if(isCookieAdequette("CUSTOMER")){
                navigateTo("/map");  
            }
        }

    }



    return (
        <div className='pageContent'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
            <h5 className="register"
             onClick={() =>  navigateTo("/register")}
             >
                Not registered yet?
            </h5>
        </div>
    );
}

export default LoginPage;

