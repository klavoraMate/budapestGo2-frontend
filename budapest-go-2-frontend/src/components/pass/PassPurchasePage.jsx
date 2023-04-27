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
        <div>
            <div className="w-full flex justify-center items-center">
                <div><h1>Daily Pass</h1> 

                </div>
                <div><h1>Weekly Pass</h1> 
                    
                </div>
                <div><h1>Monthly Pass</h1> 
                    
                </div>
                <button
                    className=" h-16  bg-blue-400 hover:bg-blue-700 text-white rounded-xl text-lg"
                    onClick={()=>fetchExpiredData()}
                >
                    Purchase
                </button>
            </div>
        </div>
    );
}

export default PassPage;
