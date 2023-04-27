import React from 'react'

function RouteCreate() {
  return (
    <div>
      <h2>Create new transportation route</h2>
      <div className='routeDetail'>
        <p>Set name of new route:</p>
        <input type='text'></input>
      </div>
      <div className='stopPanel'>
        <p>Assign selected stop to route</p>
        <select>
          <option>A</option>
        </select>
        <button>Assign stop</button>
      </div>
      <button>Create route</button>
    </div>
  )
}

export default RouteCreate