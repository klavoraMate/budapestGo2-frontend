import React, {useEffect, useRef, useState} from 'react'
import useMultiFetch from '../../api/useMultiFetch';
import Loading from "../../elements/loadingIndicator/Loading";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
function StopModify() {
  const [listOfStops, setListOfStops] = useState();
  const stopDropdown = useRef();
  const stopNewName = useRef();
  const stopLatitude = useRef();
  const stopLongitude = useRef();
  const navigate = useNavigate();
  const {data} = useMultiFetch();


  useEffect(() => {
    if(role() !== "EMPLOYEE"){
      navigate("/");
    }
    const stopURL = '/stop/all';
    (async () => setListOfStops(await data(stopURL)))();
  }, [])

  const isDataLoaded = () => {
    return !!listOfStops;
  };

  const updateStop = async () => {
    const stopURL = '/stop/update'
    const selectedStop = listOfStops[stopDropdown.current.selectedIndex];
    const stopObject = {
      id: selectedStop.id,
      name: stopNewName.current.value.trim() && selectedStop.name,
      latitude: stopLatitude.current.value && selectedStop.latitude,
      longitude: stopLongitude.current.value && selectedStop.longitude
    }
    await data(stopURL, 'PUT', stopObject);
    navigate('/workspace');
  }

  if (isDataLoaded() && role() === "EMPLOYEE") {
    return (
      <div className='pageContent'>
        <h2>Modify transportation stop</h2>
        <div className='pagePanel'>
          <div className='pageElement'>
            <div className='routeDetail'>
              <p>Select existing route:</p>
              <select ref={stopDropdown}>
                {listOfStops.map((stop) => <option key={stop.name}>{stop.name}</option>)}
              </select>
              <p>Rename selected route</p>
              <input ref={stopNewName}/>
              <p>Set latitude</p>
              <input type="number" step="0.000001" ref={stopLatitude}/>
              <p>Set longitude</p>
              <input type="number" step="0.000001" ref={stopLongitude}/>
            </div>
            <button onClick={() => updateStop()}>Update</button>
          </div>
        </div>
      </div>
    )
  } else {
    return <Loading/>
  }
}

export default StopModify