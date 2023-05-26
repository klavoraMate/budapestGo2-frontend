import {useEffect, useRef, useState} from 'react'
import { useNavigate } from "react-router-dom";
import useMultiFetch from '../../api/useMultiFetch';
import { role } from '../../token/TokenDecoder';
import MapEditor from "../../elements/mapEditor/MapEditor";
import './stopMap.css'

function StopCreate() {
  const stopName = useRef();
  const stopLatitude = useRef();
  const stopLongitude = useRef();
  const markerRef = useRef([0, 0]);
  const locationOfBudapest = [47.486208, 19.108459];
  const navigate = useNavigate();
  const { data } = useMultiFetch();

  const createStop = async () => {
    const stopURL = '/stop/add'
    const stopObject = {
      name: stopName.current.value.trim(),
      latitude: stopLatitude.current.value,
      longitude: stopLongitude.current.value
    }
    await data(stopURL, 'POST', stopObject);
    navigate('/workspace')
  }

  useEffect(() => {
    if(role() !== "EMPLOYEE"){
      navigate("/map");
    }
  }, [])

  function updateInputLatAndLng() {
    stopLatitude.current.value = (markerRef.current?.value.lat);
    stopLongitude.current.value = (markerRef.current?.value.lng);
  }

  const updateMapLatAndLng = () => {
    markerRef.current.value.lat = stopLatitude.current?.value;
    markerRef.current.value.lng = stopLongitude.current?.value;
    updateMarker();
  }

  const [markerKey, setMarkerKey] = useState(0);
  const updateMarker = () => {
    setMarkerKey(prevKey => prevKey + 1);
  }

  return (
    <>
    <div className='as'>
          <div className='routeDetail'>
      <h2>Create transportation stop</h2>
            <p>Set name of new stop:</p>
            <input ref={stopName}/>
            <p>Set latitude:</p>
            <input type="number" step="0.000001"
                   ref={stopLatitude}
                   onChange={() => updateMapLatAndLng()}
                   defaultValue={locationOfBudapest[0]}
            />
            <p>Set longitude:</p>
            <input type="number" step="0.000001"
                   ref={stopLongitude}
                   onChange={() => updateMapLatAndLng()}
                   defaultValue={locationOfBudapest[1]}
            />
          </div>
          <button className={"stopButton"} onClick={() => createStop()}>Create</button>
    </div>
      <div className={"pageElement"}>
        <MapEditor
          onClick={() => updateInputLatAndLng()}
          ref={markerRef} vehicleCategory={"default"}
          markerKey={markerKey}
        />
      </div>
    </>
  )
}

export default StopCreate