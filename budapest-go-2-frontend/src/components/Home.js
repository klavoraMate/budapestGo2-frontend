import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    const [emailCookie, setEmailCookie] = useState(null);
    const [privilegeCookie, setPrivilegeCookie] = useState(null);

    const navigateTo = (urlEnd) => {
        navigate(urlEnd);
    };

    useEffect(() => {
        const cookies = document.cookie.split("; ");
        const emailCookie = cookies.find((cookie) => cookie.startsWith("email="));
        const privilegeCookie = cookies.find((cookie) => cookie.startsWith("privilege="));
        if (emailCookie && privilegeCookie) {
            setEmailCookie(emailCookie.split("=")[1]);
            setPrivilegeCookie(privilegeCookie.split("=")[1]);
        }
    }, []);

    return (
        <>
            {emailCookie && <p>{emailCookie}</p>}
            <h1>Budapest Go 2</h1>
            <button className="login" onClick={() => navigateTo('./login')}>Login</button>
        </>
    )
}

export default Home;