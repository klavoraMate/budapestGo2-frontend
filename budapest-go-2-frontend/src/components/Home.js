import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "./cookie";

const Home = () => {
    const navigate = useNavigate();
    const [emailCookie, setEmailCookie] = useState(null);
    const [privilegeCookie, setPrivilegeCookie] = useState(null);
    const [idCookie, setIdCookie] = useState(null);
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