import React from 'react'
import { useEffect, useState, useRef } from 'react';
import useMultiFetch from '../../api/useMultiFetch';
import ListView from '../../elements/listView/ListView';
import './routeModify.css';
import Loading from "../../elements/loadingIndicator/Loading";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
import ConfirmDialog from "../../elements/confirmDialog/ConfirmDialog";

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
  const [isDeletion, setIsDeletion] = useState(false);
  const { data, isLoading } = useMultiFetch();

  useEffect(() => {
    if(role() !== "EMPLOYEE"){
      navigate("/map");
    }
    const stopURL = '/stop/all';
    const routeURL = '/route/all';
    if (isUpdated)
      (async () => setListOfStops(await data(stopURL), setListOfRoutes(await data(routeURL), setIsUpdated(false))))();
    if (isLoading && !isLoaded){
      listOfRoutes[0]&&loadAssignedStops(listOfRoutes[0].id);
    }
  }, [isUpdated]);

  const isRouteExistsByName = (oldName, newName) => {
    return listOfRoutes.filter((route) => route.name !== oldName).find((route) => route.name === newName);
  }
  const getModifiedRoute = () => {
    return listOfRoutes[routeDropdown.current.selectedIndex];
  };

  const handleDeleteButtonClick = async () => {
    getModifiedRoute().id && await deleteRouteById(getModifiedRoute().id);
    setIsDeletion(false);
    navigate("/workspace")
  }

  const changeRoute = () => {
    routeNewName.current.value = "";
    getModifiedRoute().id && loadAssignedStops(getModifiedRoute().id);
  }
  async function loadAssignedStops(routeId) {
    const scheduleURL = '/schedule/stops-connected-to-route-id/' + routeId;
    setListOfAssignedStop(await data(scheduleURL));
    setIsLoaded(true);
  }

  const addStopToList = () => {
    const nameofStop = listViewAvailableStop.current.value;
    const stopObject = {id: listViewAvailableStop.current.selected.id, name: nameofStop};
    if (listOfAssignedStop.every((stop) => (stop.id !== stopObject.id))) {
      listOfAssignedStop.push(stopObject)
    }
    setIsUpdated(true);
  }
  const removeStopFromList = () => {
    const stopToRemove = listViewAssignedStop.current.selected;
    const index = listOfAssignedStop.findIndex((stop) => stop.id === stopToRemove.id && stop.name === stopToRemove.name);

    if (index !== -1) {
      listOfAssignedStop.splice(index, 1);
    }
    setIsUpdated(true);
  }

  const deleteRouteById =  async (id) => {
    const scheduleURL = '/route/' + id;
    await data(scheduleURL, 'DELETE');
  }

  const deleteSchedulesByRouteId = async (routeId) => {
    const scheduleURL = '/schedule/connected-to-route-id/' + routeId;
    await data(scheduleURL, 'DELETE');
  }

  const updateRoute = async () => {
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

    listOfAssignedStop.forEach((stop) => {
      const scheduleObject = {
        routeId: routeId,
        stopId: stop.id
      }
      data(scheduleURL, 'POST', scheduleObject);
    });
    navigate('/workspace');
  }
  if (!isLoading) {
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
                <p>Rename selected route</p>
                <input ref={routeNewName}/>
                <p>Change route category to:</p>
                <select ref={categoryDropdown} >
                  {listOfCategories.map((category) =>
                  <option key={category}>{category}</option>)}
                </select>
              </div>
              <button onClick={() => updateRoute()}>Update</button>
              {!isDeletion && <button className={"alertButton"} onClick={() => setIsDeletion(true)}>Delete</button>}
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
                                     confirmString={routeDropdown.current.value}
                                     onClickMethod={() => handleDeleteButtonClick()}
                                     onCloseMethod={() => setIsDeletion(false)}/>
        }
      </>
  )
} else
    return <Loading/>
}

export default RouteModify