
import React, {useEffect, useState} from "react";
import {PassList} from "./PassList";


function PassPage() {
    const [passes, setPasses] = useState([]);
    
    const fetchActiveData = async () => {
      const data = await fetch("/pass/active", Cookies.get("id")); 
      const dataJSON = await data.json();
      setPasses(dataJSON);
    };
    const fetchExpiredData = async () => {
        const data = await fetch("/pass/expired", Cookies.get("id"));
        const dataJSON = await data.json();
        setPasses(dataJSON);
    };
    useEffect(() => {
        fetchActiveData();
    }, []);
    return (
        <div className="App">
            <div className="w-full flex justify-center items-center">
                <button
                    className=" h-16  bg-blue-400 hover:bg-blue-700 text-white rounded-xl text-lg"
                    onClick={()=>fetchActiveData()}
                >
                    Active passes
                </button>
                <button
                    className=" h-16  bg-blue-400 hover:bg-blue-700 text-white rounded-xl text-lg"
                    onClick={()=>fetchExpiredData()}
                >
                    Expired passes
                </button>
            </div>
  {/*           <PassList questionData={passes}/> */}
        </div>
    );
}

export default PassPage;
