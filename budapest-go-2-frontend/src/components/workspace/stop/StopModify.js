import React, {useEffect, useRef, useState} from 'react'
import useMultiFetch from '../../api/useMultiFetch';
import Loading from "../../elements/loadingIndicator/Loading";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
import ConfirmDialog from "../../elements/dialogs/confirmDialog/ConfirmDialog";
import InfoDialog from "../../elements/dialogs/infoDialog/InfoDialog";
import './stopMap.css'
import MapEditor from "../../elements/mapEditor/MapEditor";
function StopModify() {
  const [listOfStops, setListOfStops] = useState();
  const stopDropdown = useRef();
  const stopNewName = useRef();
  const stopLatitude = useRef();
  const stopLongitude = useRef();
  const [isDeletion, setIsDeletion] = useState(false);
  const markerRef = useRef([0, 0]);
  const locationOfBudapest = [47.486208, 19.108459];
  const navigate = useNavigate();
  const { data, isLoading } = useMultiFetch();


  useEffect(() => {
    if(role() !== "EMPLOYEE"){
      navigate("/");
    }
    const stopURL = '/stop/all';
    (async () => setListOfStops(await data(stopURL)))();
  }, [])

  const handleDeleteButtonClick = async () => {
    await deleteStopById(selectedStop().id);
    setIsDeletion(false);
    navigate("/workspace")
  }

  const deleteStopById =  async (id) => {
    const scheduleURL = '/stop/' + id;
    await data(scheduleURL, 'DELETE');
  }

  const selectedStop = () => {
    return listOfStops[stopDropdown.current.selectedIndex];
  }

  const isHasValue = (inputField) => {
    return (inputField.current.value.length > 0);
  }

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
  const changeStop = () => {
    const stop = selectedStop();
    stopLatitude.current.value = stop.latitude;
    stopLongitude.current.value = stop.longitude;
    updateMapLatAndLng();
  }

  const updateStop = async () => {
    const stopURL = '/stop/update'
    const stopObject = {
      id: selectedStop().id,
      name: isHasValue(stopNewName) ? stopNewName.current.value.trim() : selectedStop().name,
      latitude: isHasValue(stopLatitude) ? stopLatitude.current.value : selectedStop().latitude,
      longitude: isHasValue(stopLongitude) ? stopLongitude.current.value : selectedStop().longitude
    }
    await data(stopURL, 'PUT', stopObject);
    navigate('/workspace');
  }

  if (!isLoading && role() === "EMPLOYEE") {
    if (listOfStops) {
      return (
        <>
          <div className='as'>
                <div className='routeDetail'>
            <h2>Modify transportation stop</h2>
                  <p>Select existing route:</p>
                  <select ref={stopDropdown} onChange={() => changeStop()}>
                    {listOfStops.map((stop) => <option key={stop.name}>{stop.name}</option>)}
                  </select>
                  <p>Rename selected route</p>
                  <input ref={stopNewName}/>
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
                <button className={"stopButton"} onClick={() => updateStop()}>Update</button>
                {!isDeletion && <button className={"alertButton"} onClick={() => setIsDeletion(true)}>Delete</button>}
          </div>
          <MapEditor
            onClick={() => updateInputLatAndLng()}
            ref={markerRef} vehicleCategory={"default"}
            markerKey={markerKey}
          />
          {isDeletion && <ConfirmDialog category={"Stop"}
                                        confirmString={stopDropdown.current?.value}
                                        onClickMethod={() => handleDeleteButtonClick()}
                                        onCloseMethod={() => setIsDeletion(false)}/>}
        </>
      )
    } else {
      return <InfoDialog title={"Stop modification"} description={"There is no existing stop in the database to modify."} buttonLabel={"Go Workspace"} onClickMethod={() => navigate("/workspace")} onCloseMethod={() => navigate("/workspace")}/>;
    }
  } else {
    return <Loading/>
  }
}

export default StopModify