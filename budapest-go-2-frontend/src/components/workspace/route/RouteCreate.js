import useMultiFetch from "../../api/useMultiFetch";
import { useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';

const RouteCreate = () => {
  const listOfCategories = ["BUS","TRAM","METRO"];
  const routeNameField = useRef();
  const routeCategoryField = useRef();
  const navigate = useNavigate();
  const { data } = useMultiFetch();

  const createRoute = async () => {
    const nameOfRoute = routeNameField.current.value;
    const categoryOfRoute = routeCategoryField.current.value;
    const routeURL = '/route/add';
    const routeObject = {
      name: nameOfRoute,
      category: categoryOfRoute
    }
    await data(routeURL, 'POST', routeObject);
    navigate('/workspace');
  }

  useEffect(() => {
    if(role() !== "EMPLOYEE"){
      navigate("/map");
    }
  }, [])
  
  return (
    <div className='pageContent'>
      <h2>Create new transportation route</h2>
      <div className='routeDetail'>
        <p>Set name of new route:</p>
        <input type='text' ref={routeNameField}></input>
      </div>
      <div className='routeDetail'>
        <p>Select category of route:</p>
                <select ref={routeCategoryField}>
                  {listOfCategories.map((category) => <option key={category}>{category}</option>)}
                </select>     
      </div>
      <button onClick={() => createRoute()}>Create</button>
    </div>
  )
}

export default RouteCreate