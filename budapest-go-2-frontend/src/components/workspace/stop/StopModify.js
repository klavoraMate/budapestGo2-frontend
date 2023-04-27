import React from 'react'
import useMultiFetch from '../../api/useMultiFetch';
import { useState, useEffect } from 'react';

function StopModify() {
  const { data } = useMultiFetch();
  const [listOfStops, setListOfStops] = useState();
  useEffect(() => {
    const stopURL = '/stop/all';
    (async () => setListOfStops(await data(stopURL)))();
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, latitude, longitude } = event.target.elements;
    const stopObject = {
      latitude: latitude.value,
      longitude: longitude.value,
      name: name.value
    }
    data('/stop/', 'PUT', stopObject);
  }

  return (
    <>
      <h1>Update stop</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <select name='name'>
            {listOfStops&&listOfStops.map((stop) => <option key={stop.name}>{stop.name}</option>)}
          </select>
        </label>
        <br />
        <label>
          Latitude:
          <input type="number" name="latitude" step="0.000001" />
        </label>
        <br />
        <label>
          Longitude:
          <input type="number" name="longitude" step="0.000001" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default StopModify