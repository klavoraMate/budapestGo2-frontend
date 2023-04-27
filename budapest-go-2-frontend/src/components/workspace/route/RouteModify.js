import React from 'react'
import { useEffect, useState, useRef } from 'react';
import useMultiFetch from '../../api/useMultiFetch';

function RouteModify() {
  const [listOfStops, setListOfStops] = useState();
  const [listOfRoutes, setListOfRoutes] = useState();
  const [listOfAssignedStop] = useState([]);
  const routeDropdown = useRef();
  const routeNewName = useRef();
  const stopDropdown = useRef();
  const { data } = useMultiFetch();

  /*
    Updateing: Removing and assigning stops to the route in schedule.
  */

  useEffect(() => {
    const stopURL = '/stop/all';
    const routeURL = '/route/all';
    (async () => setListOfStops(await data(stopURL), setListOfRoutes(await data(routeURL))))();
  }, [data])

  const addStopToList = () => {
    const nameOfRoute = routeDropdown.current.value;
    const nameofStop = stopDropdown.current.value;
    if (!listOfAssignedStop.includes(nameofStop)) {
      listOfAssignedStop.push(nameofStop)
      console.log(nameofStop + ' assigned to ' + nameOfRoute + ' current length of route is: ' + listOfAssignedStop.length);
    }
    else {
      console.log("Selected stop is already assigned to this route!");
    }
  }

  const deleteRouteFromSchedule = async () => {
    listOfRoutes&&listOfRoutes.forEach((route) => console.log(route))
  }

  const updateRoute = async () => {
    deleteRouteFromSchedule();
    const nameOfRoute = routeNewName.current.value;
    const scheduleURL = '/schedule';
    const routeURL = '/route/';
    const routeObject = {
      name: nameOfRoute
    }
    await data(routeURL, 'PUT', routeObject);
    listOfAssignedStop.forEach((nameofStop) => {
      const scheduleObject = {
        routeName: nameOfRoute,
        stopName: nameofStop
      }
      data(scheduleURL, 'PUT', scheduleObject);
    });
  }

  return (
    <div>
      <h2>Modify transportation route</h2>
      <div className='routeDetail'>
        <p>Select existing route:</p>
        <select ref={routeDropdown}>
          {listOfRoutes && listOfRoutes.map((route) => <option key={route.name}>{route.name}</option>)}
        </select>
        <p>Rename selected route</p>
        <input ref={routeNewName}/>
      </div>
      <div className='stopPanel'>
        <p>Assign selected stop to route</p>
        <select ref={stopDropdown}>
          {listOfStops && listOfStops.map((stop) => <option key={stop.name}>{stop.name}</option>)}
        </select>
        <button onClick={() => addStopToList()}>Assign stop</button>
      </div>
      <button onClick={() => updateRoute()}>Update route</button>
    </div>
  )
}

export default RouteModify