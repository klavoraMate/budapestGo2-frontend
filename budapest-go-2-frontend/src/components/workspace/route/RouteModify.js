import React from 'react'
import { useEffect, useState, useRef } from 'react';
import useMultiFetch from '../../api/useMultiFetch';
import ListView from '../../elements/listView/ListView';
import './routeModify.css';
import Loading from "../../elements/loadingIndicator/Loading";

function RouteModify() {
  const [listOfStops, setListOfStops] = useState([]);
  const [listOfRoutes, setListOfRoutes] = useState([]);
  const [listOfAssignedStop] = useState([]);
  const routeDropdown = useRef();
  const routeNewName = useRef();
  const listViewAvailableStop = useRef();
  const listViewAssignedStop = useRef();
  const { data } = useMultiFetch();

  useEffect(() => {
    const stopURL = '/stop/all';
    const routeURL = '/route/all';
    (async () => setListOfStops(await data(stopURL), setListOfRoutes(await data(routeURL))))();
  }, [data])

  const isDataLoaded = () => {
    return listOfRoutes.length > 0 && listOfStops.length > 0 && listOfAssignedStop !== undefined;
  };

  const isRouteExistsByName = (oldName, newName) => {
    return listOfRoutes.filter((route) => route.name !== oldName).find((route) => route.name === newName);
  }

  const addStopToList = () => {
    const nameofStop = listViewAvailableStop.current.value;
    const stopObject = {id: listViewAvailableStop.current.selected.id, name: nameofStop};
    if (listOfAssignedStop.every((stop) => (stop.id !== stopObject.id))) {
      listOfAssignedStop.push(stopObject)
    }
  }
  const removeStopFromList = () => {
    const stopToRemove = listViewAssignedStop.current.selected;
    const index = listOfAssignedStop.findIndex((stop) => stop.id === stopToRemove.id && stop.name === stopToRemove.name);

    if (index !== -1) {
      listOfAssignedStop.splice(index, 1);
    }
  }

  const deleteSchedulesByRouteId = async (routeId) => {
    const scheduleURL = '/schedule/connected-to-route-id/' + routeId;
    await data(scheduleURL, 'DELETE');
  }

  const updateRoute = async () => {
    const nameOfRoute = routeNewName.current.value.trim();
    if (isRouteExistsByName(nameOfRoute))
      throw new Error("There is already exist a Route in this name");

    const modifiedRoute = listOfRoutes.filter((route) => route.name === routeDropdown.current.value)[0];

    await deleteSchedulesByRouteId(modifiedRoute.id);

    const routeURL = '/route/update';
    const routeObject = {
      id: modifiedRoute.id,
      name: nameOfRoute
    }
    await data(routeURL, 'PUT', routeObject);

    const scheduleURL = '/schedule/add';

    listOfAssignedStop.forEach((stop) => {
      const scheduleObject = {
        routeId: modifiedRoute.id,
        stopId: stop.id
      }
      data(scheduleURL, 'POST', scheduleObject);
    });
  }
if (isDataLoaded()) {
  return (
      <div className='pageContent'>
        <h2>Modify transportation route</h2>
        <div className='pagePanel'>
          <div className='pageElement'>
            <div className='routeDetail'>
              <p>Select existing route:</p>
              <select ref={routeDropdown} onChange={() => routeNewName.current.value = routeDropdown.current.value}>
                {listOfRoutes.map((route) => <option key={route.name}>{route.name}</option>)}
              </select>
              <p>Rename selected route</p>
              <input ref={routeNewName} defaultValue={listOfRoutes[0].name}/>
            </div>
            <button onClick={() => updateRoute()}>Update route</button>
          </div>

          <div className='pageElement'>
            <div className='listPanel'>
              <div className='element'>
                <p>Available stops</p>
                <ListView key="available-stops" listElements={listOfStops.filter((x) => !listOfAssignedStop.map((y) => y.id).includes(x.id))} ref={listViewAvailableStop}/>
                <button onClick={() => addStopToList()}>{'Assign (>)'}</button>
              </div>
              <div className='element'>
                <p>Assigned stops</p>
                <ListView key="assigned-stops" listElements={listOfAssignedStop} ref={listViewAssignedStop}/>
                <button onClick={() => removeStopFromList()}>{'Remove (<)'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}else
    return <Loading/>
}

export default RouteModify