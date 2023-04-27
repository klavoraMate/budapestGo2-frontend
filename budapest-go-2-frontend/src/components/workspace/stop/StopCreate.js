import React from 'react'


function StopCreate() {



  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, latitude, longitude } = event.target.elements;
    fetch('/stop/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        name: name
      }),
    });

  }


  return (
    <>
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
      <div>stopCreate</div>
    </>
  )
}

export default StopCreate