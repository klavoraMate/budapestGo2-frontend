import useMultiFetch from "../../api/useMultiFetch";
import { useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { role } from '../token/TokenDecoder';

const RouteCreate = () => {
  const routeNameField = useRef();
  const navigate = useNavigate();
  const { data } = useMultiFetch();

  const createRoute = async () => {
    const nameOfRoute = routeNameField.current.value;
    const routeURL = '/route/add';
    const routeObject = {
      name: nameOfRoute
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
      <button onClick={() => createRoute()}>Create</button>
    </div>
  )
}

export default RouteCreate