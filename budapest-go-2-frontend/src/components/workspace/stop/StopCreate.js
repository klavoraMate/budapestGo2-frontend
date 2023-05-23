import { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import useMultiFetch from '../../api/useMultiFetch';
import { role } from '../../token/TokenDecoder';

function StopCreate() {
  const stopName = useRef();
  const stopLatitude = useRef();
  const stopLongitude = useRef();
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

  return (
    <div className='pageContent'>
      <h2>Create transportation stop</h2>
      <div className='pagePanel'>
        <div className='pageElement'>
          <div className='routeDetail'>
            <p>Set name of new stop:</p>
            <input ref={stopName}/>
            <p>Set latitude:</p>
            <input type="number" step="0.000001" ref={stopLatitude}/>
            <p>Set longitude:</p>
            <input type="number" step="0.000001" ref={stopLongitude}/>
          </div>
          <button onClick={() => createStop()}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default StopCreate