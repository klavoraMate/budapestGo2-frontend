import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function RegisterPage (){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const isMounted = useRef(true);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        CreateClient(email,password);
    }
    const CreateClient =(email, password)=>{
        fetch('/client/register', {
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
                let data = response.json;
                if (response.status === 200) {
                    console.log("Client created.");
                    navigate("/");
                }else{
                    setHidden(false);
                    console.log("Client with that email registered.")
                }
                return data;
            })
            .catch(error => console.error(error));
    };
    return (
      <div className="pageContent">
        <div>Register!</div>
        <div hidden = {hidden}>Email already registered</div>
        <div className="flex justify-center flex-col items-center text-2xl ">
        <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  };
  export default RegisterPage;