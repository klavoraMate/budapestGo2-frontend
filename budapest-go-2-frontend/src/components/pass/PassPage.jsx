import "./PassPage.css";
import React, {useEffect, useState} from "react";
import {PassList} from "./PassList";
import Loading from "../elements/loadingIndicator/Loading";
import { useNavigate } from "react-router-dom";
import { email } from "../token/TokenDecoder";
import useMultiFetch from "../api/useMultiFetch";
function PassPage() {
    const navigate = useNavigate();
    const { data } = useMultiFetch();
    const [passes, setPasses] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isActive, setIsActive] = useState(true);  
   
    const fetchActiveData = async () => {
      setIsFetching(true);
      setIsActive(true);
      const response = await data(`/pass/active/${email()}`);
      setPasses(await response);
      setIsFetching(false);
    };
  
    const fetchExpiredData = async () => {
      setIsFetching(true);
      setIsActive(false);
      const response = await data(`/pass/expired/${email()}`);
      const dataJSON = await response;
      setPasses(await dataJSON);
      setIsFetching(false);
    };
    
    useEffect(() => {
        fetchActiveData();
    }, []);
  
    return (
      <div id="pass">
        <div>
        <div id="passbutton">
          <button id="buttons"
            onClick={fetchActiveData}
          >
            Active passes
          </button>
          <button id="buttons"
            onClick={fetchExpiredData}
          >
            Expired passes
          </button>
          <button id="buttons"
            onClick={()=>navigate("/purchase")}
          >
            Purchase pass
          </button>
        </div>
        {isFetching ? (
           <Loading/>
        ) : passes.length > 0 ? (
        <div  id="passContent">
            <PassList passData={passes}
                      active={isActive}
             />
        </div>
          ) : ( <div id="noData">
          <p>No data</p>
        </div>)}
        </div>
      </div>
    );
  }

export default PassPage;
