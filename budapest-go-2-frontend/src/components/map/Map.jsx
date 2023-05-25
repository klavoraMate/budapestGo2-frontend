import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import useMultiFetch from "../api/useMultiFetch";
import {useEffect, useState} from 'react'
import L from "leaflet";
import './leaflet.css';
import './map.css'
const getIconPath = (vehicleCategory) => {
  const iconName = "-marker-icon.png";
  const publicPath = process.env.PUBLIC_URL + "/map/";
  return publicPath + (vehicleCategory.toLowerCase() ?? "default") + iconName;
}
const getIcon = (vehicle) => {
      return L.icon({
          iconUrl: getIconPath(vehicle.category),
          iconSize: [25, 41]
  })
}
const Map = () => {
  const { data } = useMultiFetch();
  const [listOfStopsOfRoute, setListOfStopsOfRoute] = useState([]);
  const [listOfRoutes, setListOfRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isUpdated, setUpdate] = useState(true);
  const locationOfBudapest = [47.486208, 19.108459];

  useEffect(() => {
    const stopURL = '/stop/all';
    const routeURL = '/route/all';
    (async () => setListOfRoutes(await data(routeURL)))();
    }, []
  );

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
    setSelectedRoute(route);
    const scheduleURL = '/schedule/stops-connected-to-route-id/' + route.id;
    event.target.value = route.name;
    (async () => setListOfStopsOfRoute(await data(scheduleURL)))();
    setUpdate(true);
  };

  if (isUpdated)
  return (
      <div className={"mapContent"}>
        <input className={"searchBar"} type={"text"} placeholder={"Search routes, lines, stops or spots"} onKeyDown={(event) => (event.code === 'Enter') && search(event)}/>
        <MapContainer className="map" center={locationOfBudapest} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            {listOfStopsOfRoute&&listOfStopsOfRoute.map(stop => <Marker key={stop.id} icon={getIcon(selectedRoute)} position={[stop.location.latitude, stop.location.longitude]}>
                <Popup>
                    {stop.name}
                </Popup>
            </Marker>)}
        </MapContainer>
      </div>
  )
}
export default Map