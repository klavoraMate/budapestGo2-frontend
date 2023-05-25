import React from 'react'
import { useEffect, useState, useRef } from 'react';
import useMultiFetch from '../../api/useMultiFetch';
import ListView from '../../elements/listView/ListView';
import './routeModify.css';
import Loading from "../../elements/loadingIndicator/Loading";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
import ConfirmDialog from "../../elements/dialogs/confirmDialog/ConfirmDialog";
import InfoDialog from "../../elements/dialogs/infoDialog/InfoDialog";
import MapPreview from "../../elements/mapPreview/MapPreview";

function RouteModify() {
  const navigate = useNavigate()
  const listOfCategories = ["BUS","TRAM","METRO"];
  const [listOfStops, setListOfStops] = useState([]);
  const [listOfRoutes, setListOfRoutes] = useState([]);
  const [listOfAssignedStop, setListOfAssignedStop] = useState([]);
  const routeDropdown = useRef();
  const routeNewName = useRef();
  const categoryDropdown = useRef();
  const listViewAvailableStop = useRef();
  const listViewAssignedStop = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);
  const [isDeletion, setDeletion] = useState(false);
  const { data, isLoading } = useMultiFetch();

  useEffect(() => {
    console.log("1")
    if(role() !== "EMPLOYEE"){
      navigate("/map");
    }
    const stopURL = '/stop/all';
    const routeURL = '/route/all';
    if (isUpdated)
      (async () => {
        setListOfStops(await data(stopURL));
        setListOfRoutes(await data(routeURL));
        setIsUpdated(false);
      })();
    if (!isLoading && !isLoaded){
      listOfRoutes[0]&&loadAssignedStops(listOfRoutes[0].id);
    }
  }, [isUpdated, isLoading, listOfRoutes, listOfAssignedStop]);

  const isRouteExistsByName = (oldName, newName) => {
    console.log("2")
    return listOfRoutes.filter((route) => route.name !== oldName).find((route) => route.name === newName);
  }
  const getModifiedRoute = () => {
    console.log("3")
    const selectedRoute = routeDropdown.current?.value;
    return listOfRoutes.find((route) => route.name === selectedRoute) || {};
  };


  const handleDeleteButtonClick = async () => {
    console.log("4")
    getModifiedRoute().id && await deleteRouteById(getModifiedRoute().id);
    setDeletion(false);
    navigate("/workspace")
  }

  const changeRoute = () => {
    console.log("5")
    console.log("change route")
    routeNewName.current.value = "";
    loadAssignedStops(getModifiedRoute().id);
  };

  async function loadAssignedStops(routeId) {
    console.log("6")
    const scheduleURL = '/schedule/stops-connected-to-route-id/' + routeId;
    setListOfAssignedStop(await data(scheduleURL));
    setIsLoaded(true);
  }

  const addStopToList = () => {
    console.log("7")
    const nameofStop = listViewAvailableStop.current.value;
    const stopObject = {id: listViewAvailableStop.current.selected.id, name: nameofStop};
    if (listOfAssignedStop.every((stop) => (stop.id !== stopObject.id))) {
      listOfAssignedStop.push(stopObject)
    }
    setIsUpdated(true);
  }
  const removeStopFromList = () => {
    console.log("8")
    const stopToRemove = listViewAssignedStop.current.selected;
    const index = listOfAssignedStop.findIndex((stop) => stop.id === stopToRemove.id && stop.name === stopToRemove.name);

    if (index !== -1) {
      listOfAssignedStop.splice(index, 1);
    }
    setIsUpdated(true);
  }

  const deleteRouteById =  async (id) => {
    console.log("9")
    const scheduleURL = '/route/' + id;
    await data(scheduleURL, 'DELETE');
  }

  const deleteSchedulesByRouteId = async (routeId) => {
    console.log("10")
    const scheduleURL = '/schedule/connected-to-route-id/' + routeId;
    await data(scheduleURL, 'DELETE');
  }

  const updateRoute = async () => {
    console.log("11")
    const routeId = getModifiedRoute().id;
    const nameOfRoute = routeNewName.current.value.length > 0 ? routeNewName.current.value : routeDropdown.current.value;
    const categoryOfRoute = categoryDropdown.current.value;
    if (isRouteExistsByName(nameOfRoute))
      throw new Error("There is already exist a Route in this name");


    await deleteSchedulesByRouteId(routeId);

    const routeURL = '/route/update';
    const routeObject = {
      id: routeId,
      name: nameOfRoute,
      category:categoryOfRoute
    }
    await data(routeURL, 'PUT', routeObject);

    const scheduleURL = '/schedule/add';

    await Promise.all(listOfAssignedStop.map((stop) => {
      const scheduleObject = {
        routeId: routeId,
        stopId: stop.id
      };
      return data(scheduleURL, 'POST', scheduleObject);
    }));
    navigate('/workspace');
  }
  if (!isLoading) {
    if (listOfRoutes.length !== 0) {
      return (
          <>
            <div className='pageContent'>
              <h2>Modify transportation route</h2>
              <div className='pagePanel'>
                <div className='pageElement'>
                  <div className='routeDetail'>
                    <p>Select existing route:</p>
                    <select ref={routeDropdown} onChange={() => changeRoute()}>
                      {listOfRoutes.map((route) => <option key={route.name}>{route.name}</option>)}
                    </select>
                    <p>Change route category to:</p>
                    <select ref={categoryDropdown} >
                      {listOfCategories.map((category) =>
                      <option key={category}>{category}</option>)}
                    </select>
                    <p>Rename selected route</p>
                    <input ref={routeNewName}/>
                  </div>
                  <button onClick={() => updateRoute()}>Update</button>
                  {!isDeletion && <button className={"alertButton"} onClick={() => setDeletion(true)}>Delete</button>}
                  <br/>
                  <h2>Route preview</h2>
                  <h4>Showing assigned and not assigned stops</h4>
                  {getModifiedRoute() && <MapPreview positions={listOfStops} vehicleCategory={getModifiedRoute().category}/>}
                </div>

                <div className='pageElement'>
                  <div className='listPanel'>
                    <div className='element'>
                      <p>Available stops</p>
                      <ListView key="available-stops" listElements={listOfStops.filter((x) => !listOfAssignedStop.map((y) => y.id).includes(x.id))} ref={listViewAvailableStop}/>
                      <button onClick={() => addStopToList()}>{'Assign'}</button>
                    </div>
                    <div className='element'>
                      <p>Assigned stops</p>
                      <ListView key="assigned-stops" listElements={listOfAssignedStop} ref={listViewAssignedStop}/>
                      <button onClick={() => removeStopFromList()}>{'Remove'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isDeletion && <ConfirmDialog category={"Route"}
                                         confirmString={routeDropdown.current&&routeDropdown.current.value}
                                         onClickMethod={() => handleDeleteButtonClick()}
                                         onCloseMethod={() => setDeletion(false)}/>
            }
          </>
      )
    } else {
      return <InfoDialog title={"Route modification"} description={"There is no existing route in the database to modify."} buttonLabel={"Go Workspace"} onClickMethod={() => navigate("/workspace")} onCloseMethod={() => navigate("/workspace")}/>;
    }
} else
    return <Loading/>;
}

export default RouteModify