import {useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './leaflet.css';
import './map.css'
import useMultiFetch from "../api/useMultiFetch";
import L from "leaflet";
const getIcon = () => {
    return L.icon({
        iconUrl: process.env.PUBLIC_URL + '/map/marker-icon.png',
        iconSize: [25, 41]
    })
}
const Map = () => {
    const { data } = useMultiFetch();
    const [listOfStops, setListOfStops] = useState([]);
    const [listOfStopsOfRoute, setListOfStopsOfRoute] = useState([]);
    const [listOfRoutes, setListOfRoutes] = useState([]);
    const locationOfBudapest = [47.486208, 19.108459];
    useEffect(() => {
        const stopURL = '/stop/all';
        const routeURL = '/route/all';
        (async () => setListOfStops(await data(stopURL), setListOfRoutes(await data(routeURL))))();
    }, [data])

  useEffect(() => {
    console.log("update")
  }, [listOfStopsOfRoute])

  const search = (event) => {
    const searchText = event.target.value;
    const results = [];

    for (let routeIndex = 0; routeIndex < listOfRoutes.length; routeIndex++) {
      const route = listOfRoutes[routeIndex];
      const name = route.name;
      let score = 0;

      for (let searchTextCharIndex = 0; searchTextCharIndex < searchText.length; searchTextCharIndex++) {
        for (let routeNameCharIndex = 0; routeNameCharIndex < name.length; routeNameCharIndex++) {
          if (searchText[searchTextCharIndex] === name[routeNameCharIndex]) {
            score++;
            break;
          }
        }
      }

      if (score > 0) {
        results.push([score, route]);
      }
    }

    results.sort((a, b) => b[0] - a[0]);

    const route = results[0][1];
    const scheduleURL = '/schedule/stops-connected-to-route-id/' + route.id;
    event.target.value = route.name;
    (async () => setListOfStopsOfRoute(await data(scheduleURL)))();
    for (let allStop = 0; allStop < listOfStops.length; allStop++){
      for (let selectedStop = 0; selectedStop < listOfStopsOfRoute.length; selectedStop++){
        console.log([listOfStops[allStop].id, listOfStopsOfRoute[selectedStop].id])
      }
    }
  };


  return (
      <div className={"mapContent"}>
          <input className={"searchBar"} type={"text"} placeholder={"Search routes, lines, stops or spots"} onKeyDown={(event) => (event.code === 'Enter') && search(event)}/>
        <MapContainer className="map" center={locationOfBudapest} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            {listOfStopsOfRoute&&listOfStopsOfRoute.map(stop => <Marker key={stop.id} icon={getIcon()} position={[stop.location.latitude, stop.location.longitude]}>
                <Popup>
                    {stop.name}
                </Popup>
            </Marker>)}
      </MapContainer>
      </div>
  )
}
export default Map