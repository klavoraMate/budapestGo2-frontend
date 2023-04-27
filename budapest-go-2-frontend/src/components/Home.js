import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const navigateTo = (urlEnd) => {
        navigate(urlEnd);
    };

    return (
        <>
            <h1>Budapest Go 2</h1>
            <button className="login" onClick={() => navigateTo('./login')}>Login</button>
        </>
    )
}

export default Home;