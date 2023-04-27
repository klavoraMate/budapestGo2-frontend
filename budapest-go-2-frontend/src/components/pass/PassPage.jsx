import "./PassPage.css";
import{ getCookie } from "../cookie";
import React, {useEffect, useState} from "react";
import {PassList} from "./PassList";
import { useNavigate } from "react-router-dom";

function PassPage() {
    const navigate = useNavigate();
    const [passes, setPasses] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
  
    async function fetchActiveData() {
      setIsFetching(true);
      const data = await fetch(`/pass/active/2`);
      setPasses(await data.json());
      setIsFetching(false);
    };
  
    const fetchExpiredData = async () => {
      setIsFetching(true);
      const data = await fetch(`/pass/expired/${getCookie("id")}`);
      const dataJSON = await data.json();
      setPasses(await dataJSON);
      setIsFetching(false);
    };
    
    useEffect(() => {
        fetchActiveData()
    }, []);
  
    return (
      <div id="pass">
        <div>
        <div>
          <button
            onClick={fetchActiveData}
          >
            Active passes
          </button>
          <button
            onClick={fetchExpiredData}
          >
            Expired passes
          </button>
          <button
            onClick={()=>navigate("/purchase")}
          >
            Purchase pass
          </button>
        </div>
        
        {isFetching ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : passes.length > 0 ? (
        <div  id="passContent">
            <PassList passData={passes} />
        </div>
          ) : ( <div id="noData">
          <p>No data</p>
        </div>)}
        </div>
      </div>
    );
  }

export default PassPage;
