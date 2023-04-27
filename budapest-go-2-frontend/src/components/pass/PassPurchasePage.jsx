import "./PassPurchasePage.css";
import{ getCookie } from "../cookie";
import React, {useEffect, useState} from "react";


function PassPage() {
    const [passes, setPasses] = useState([]);
    const fetchExpiredData = async () => {

        const data = await fetch(`/pass/expired/${getCookie("id")}`);
        const dataJSON = await data.json();
        setPasses(dataJSON);

    };
    useEffect(() => {

    }, []);
    return (
        <div className="purchase">
            <div className="canvas">
                <div className="ticket">
                    <h2>Daily Pass</h2> 
                    <h3>300 Ft</h3>
                </div>
                <div className="ticket">
                    <h2>Weekly Pass</h2> 
                    <h3>2000 Ft</h3>
                </div>
                <div className="ticket">
                    <h2>Monthly Pass</h2> 
                    <h3>9000 Ft</h3>
                </div>
            </div>
                <button
                    className=" h-16  bg-blue-400 hover:bg-blue-700 text-white rounded-xl text-lg"
                    onClick={()=>fetchExpiredData()}
                >
                    Purchase
                </button>
        </div>
    );
}

export default PassPage;
