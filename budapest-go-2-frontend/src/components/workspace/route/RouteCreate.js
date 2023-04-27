import useMultiFetch from "../../api/useMultiFetch";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const RouteCreate = () => {
  const [listOfStops, setListOfStops] = useState();
  const [listOfAssignedStop] = useState([]);
  const routeNameField = useRef();
  const stopDropDown = useRef();
  const { data } = useMultiFetch();
  useEffect(() => {
    const stopURL = '/stop/all';
    (async () => setListOfStops(await data(stopURL)))();
  }, [data])

  const addStopToList = () => {
    const nameOfRoute = routeNameField.current.value;
    const nameofStop = stopDropDown.current.value;
    if (!listOfAssignedStop.includes(nameofStop)) {
      listOfAssignedStop.push(nameofStop)
      console.log(nameofStop + ' assigned to ' + nameOfRoute + ' current length of route is: ' + listOfAssignedStop.length);
    }
    else {
      console.log("Selected stop is already assigned to this route!");
    }
  }

  const createRoute = async () => {
    const nameOfRoute = routeNameField.current.value;
    const routeURL = '/route/add';
    const scheduleURL = '/schedule/add';
    const routeObject = {
      name: nameOfRoute
    }
    await data(routeURL, 'POST', routeObject);
    listOfAssignedStop.forEach((nameofStop) => {
      const scheduleObject = {
        routeName: nameOfRoute,
        stopName: nameofStop
      }
      data(scheduleURL, 'POST', scheduleObject);
    });
  }

  return (
    <div className='pageContent'>
      <h2>Create new transportation route</h2>
      <div className='routeDetail'>
        <p>Set name of new route:</p>
        <input type='text' ref={routeNameField}></input>
      </div>
      <div className='stopPanel'>
        <p>Assign selected stop to route</p>
        <select ref={stopDropDown}>
          {listOfStops && listOfStops.map((stop) => <option key={stop.name}>{stop.name}</option>)}
        </select>
        <button onClick={() => addStopToList()}>Assign stop</button>
      </div>
      <button onClick={() => createRoute()}>Create route</button>
    </div>
  )
}

export default RouteCreate