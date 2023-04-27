import useMultiFetch from "../../api/useMultiFetch";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

/*
A route-hoz hozza adando stop-ok bekerulnek az assignStopList-be,
a createRoute gomb megnyomasaval POST-oljuk route tablere az uj route-ot,
az uj route nevet eltaroljuk es schedule table-hez adjuk annyi route-stop
part amennyi assigned stop elem van a listaban.
*/

const RouteCreate = () => {
  const [listOfStops, setListOfStops] = useState();
  const [listOfAssignedStop] = useState([]);
  const routeNameField = useRef();
  const stopDropDown = useRef();
  const {data} = useMultiFetch();
  useEffect(() => {
    const url = '/stop/all';
    (async () => setListOfStops(await data(url)))();
  }, [data])

  const addStopToList = () => {
    const nameOfRoute = routeNameField.current.value;
    const nameofStop = stopDropDown.current.value;
    if (!listOfAssignedStop.includes(nameofStop)){
      listOfAssignedStop.push(nameofStop)
      console.log(nameofStop + ' assigned to ' + nameOfRoute + ' current length of route is: ' + listOfAssignedStop.length);
    }
    else {
      console.log("Selected stop is already assigned to this route!");
    }
  }

  const createRoute = () => {

  }

  return (
    <div>
      <h2>Create new transportation route</h2>
      <div className='routeDetail'>
        <p>Set name of new route:</p>
        <input type='text' ref={routeNameField}></input>
      </div>
      <div className='stopPanel'>
        <p>Assign selected stop to route</p>
        <select ref={stopDropDown}>
          {listOfStops&&listOfStops.map((stop) => <option key={stop.name}>{stop.name}</option>)}
        </select>
        <button onClick={() => addStopToList()}>Assign stop</button>
      </div>
      <button onClick={() => createRoute()}>Create route</button>
    </div>
  )
}

export default RouteCreate