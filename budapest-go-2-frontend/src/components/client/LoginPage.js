import React, { useState, useRef, useEffect } from "react";
import { getCookie, isCookieAdequette } from "../cookie";
import { token, role } from "../token/TokenDecoder";
import { useNavigate } from "react-router-dom";
import useMultiFetch from "../api/useMultiFetch";
import  "./authentication.css";
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [hidden, setHidden] = useState(true);
    const isMounted = useRef(true);
    const navigate = useNavigate()
    const { data } = useMultiFetch();

    const navigateTo = (urlEnd) => {
        navigate(urlEnd);
    };

    useEffect(() => {
        if (token() != null) {
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response =
            await fetch('/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            if(response.ok){
                const data = await response.json();
                const token = data.token;
                const time = data.time;
                localStorage.setItem('token', token);
                localStorage.setItem('time', time);
                if(role() === "EMPLOYEE"){
                    navigate("/workspace");
                }
                else if(role() === "CUSTOMER"){
                    console.log("data");
                    navigate("/map");
             }
                } else {
                    setHidden(false);
                    await response.text().then(errorMessage => setMessage(errorMessage));
                }
        };
          

    return (
        <div className='pageContent'>
            <h1>Login</h1>
            <div hidden={hidden}>{message}</div>
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
            <h3 className="register"
                onClick={() => navigateTo("/register")}
            >
                Not registered yet?
            </h3>
        </div>
    );
}

export default LoginPage;

