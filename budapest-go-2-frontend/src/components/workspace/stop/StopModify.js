import React from 'react'
import useMultiFetch from '../../api/useMultiFetch';

function StopModify() {
  const { data } = useMultiFetch();

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
          <input type="text" name="name" />
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