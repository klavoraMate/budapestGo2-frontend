import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './workspace.css'
import { role } from '../token/TokenDecoder';
function Workspace() {
  const navigate = useNavigate()

  useEffect(() => {
    if(role() !== "EMPLOYEE"){
      navigate("/map");
    }
  })
  
  return (
    <div className='pageContent'>
      <div className='group'>
        <label>Manage routes</label>
        <div className='groupContent'>
          <button onClick={() => navigate('/route/add')}>Add new routes</button>
          <button onClick={() => navigate('/route/edit')}>Modify routes</button>
        </div>
      </div>
      <div className='group'>
      <label>Manage stops</label>
        <div className='groupContent'>
          <button onClick={() => navigate('/stop/add')}>Add new stops</button>
          <button onClick={() => navigate('/stop/edit')}>Modify stops</button>
        </div>
      </div>
    </div>
    )}

export default Workspace