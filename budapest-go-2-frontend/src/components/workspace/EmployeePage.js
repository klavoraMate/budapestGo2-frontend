import React from 'react'
import { useNavigate } from 'react-router-dom'

function EmployeePage() {
  const navigate = useNavigate()
  return (
    <div className='pageContent'>
      <div className='routeGroup'>
        <label>Manage routes</label>
        <button onClick={() => navigate('/route/add')}>Add new routes</button>
        <button onClick={() => navigate('/route/edit')}>Modify routes</button>
      </div>
      <div className='stopGroup'>
      <label>Manage stops</label>
        <button onClick={() => navigate('/stop/add')}>Add new stops</button>
        <button onClick={() => navigate('/stop/edit')}>Modify stops</button>
      </div>
    </div>
  )
}

export default EmployeePage