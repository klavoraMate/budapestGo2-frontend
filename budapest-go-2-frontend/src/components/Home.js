import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "./cookie";

const Home = () => {
    const navigate = useNavigate();
    const [emailCookie, setEmailCookie] = useState(null);
    const [privilegeCookie, setPrivilegeCookie] = useState(null);

    const navigateTo = (urlEnd) => {
        navigate(urlEnd);
    };

    const handleLogout = () => {
        deleteCookie("email");
        deleteCookie("privilege");
        setEmailCookie(null);
        setPrivilegeCookie(null)
    }

    useEffect(() => {
        const email = getCookie("email");
        const privilege = getCookie("privilege");
        if (email && privilege) {
            setEmailCookie(email);
            setPrivilegeCookie(privilege);
        }
    }, []);

    return (
        <div className='pageContent'>
            {emailCookie && <div>
                <p>{emailCookie}</p>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>}
            <h1>Budapest Go 2</h1>
            <button className="login" onClick={() => navigateTo('./login')}>Login</button>
        </div>
    )
}

export default Home;