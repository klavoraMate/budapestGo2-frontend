import{ getCookie } from "../cookie";
import React, {useEffect, useState} from "react";
import {PassList} from "./PassList";


function PassPage() {
    const [passes, setPasses] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const fetchActiveData = async () => {
      setIsFetching(false);
      const data = await fetch(`/pass/active/2`); 
      const dataJSON = await data.json();
      setPasses(dataJSON);
      console.log(dataJSON);
    
    };
    const fetchExpiredData = async () => {
        setIsFetching(true);
        const data = await fetch(`/pass/expired/${getCookie("id")}`);
        const dataJSON = await data.json();
        setPasses(dataJSON);
        setIsFetching(false);
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
            </div>{isFetching ? (
        <div className="w-full flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <PassList questionData={passes} />
      )}
        </div>
    );
}

export default PassPage;
