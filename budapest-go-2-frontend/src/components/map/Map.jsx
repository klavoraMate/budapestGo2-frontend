import {useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./leaflet.css";
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
    const [listOfStops, setListOfStops] = useState();
    const [listOfRoutes, setListOfRoutes] = useState();
    const locationOfBudapest = [47.486208, 19.108459];
    useEffect(() => {
        const stopURL = '/stop/all';
        const routeURL = '/route/all';
        (async () => setListOfStops(await data(stopURL), setListOfRoutes(await data(routeURL))))();
    }, [data])
  return (
      <div className={"mapContent"}>
          <input className={"searchBar"} type={"text"} placeholder={"Search routes, lines, stops or spots"}/>
        <MapContainer center={locationOfBudapest} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            {listOfStops&&listOfStops.map(stop => <Marker icon={getIcon()} position={[stop.latitude, stop.longitude]}>
                <Popup>
                    {stop.name}
                </Popup>
            </Marker>)}
      </MapContainer>
      </div>
  )
}
export default Map