import "./PassPage.css";
import{ getCookie } from "../cookie";
import React, {useEffect, useState} from "react";
import {PassList} from "./PassList";

function PassPage() {
    const [passes, setPasses] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
  
    async function fetchActiveData() {
      setIsFetching(true);
      const data = await fetch(`/pass/active/${getCookie("id")}`);
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
        <div id="passContent">
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
        </div>
        {isFetching ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : passes.length > 0 ? (
            <PassList passData={passes} />
          ) : ( <div id="noData">
          <p>No data</p>
        </div>)}
      </div>
    );
  }

export default PassPage;
