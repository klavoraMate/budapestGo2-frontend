import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import React from "react";
import L from "leaflet";
import "./mapPreview.css"
const getIconPath = (vehicleCategory) => {
  const iconName = "-marker-icon.png";
  const publicPath = process.env.PUBLIC_URL + "/map/";
  return publicPath + (vehicleCategory ? vehicleCategory.toLowerCase() : "default") + iconName;
}
const getIcon = (vehicleCategory) => {
  return L.icon({
    iconUrl: getIconPath(vehicleCategory),
    iconSize: [25, 41]
  })
}
const calculateCenter = (positions) => {
  const locationOfBudapest = [47.486208, 19.108459];
  if (!positions || positions.length === 0)
    return locationOfBudapest;

  let latitude = 0;
  let longitude = 0;

  positions && positions.forEach((pos) => {latitude += pos.latitude; longitude += pos.longitude})
  latitude = latitude / positions.length;
  longitude = longitude / positions.length
  return [latitude, longitude];
}

const calculateZoom = (positions) => {
  if (!positions || positions.length === 0)
    return 10;

  const latitudes = positions.map((pos) => pos.latitude);
  const longitudes = positions.map((pos) => pos.longitude);
  const zoomFactor = -0.1;

  const maxLat = Math.max(...latitudes);
  const minLat = Math.min(...latitudes);
  const maxLng = Math.max(...longitudes);
  const minLng = Math.min(...longitudes);

  const latDistance = Math.abs(maxLat - minLat);
  const lngDistance = Math.abs(maxLng - minLng);

  const distance = Math.max(latDistance, lngDistance);

  return Math.floor(Math.log2(360 / distance) + zoomFactor);
};
const MapPreview = ({positions, vehicleCategory}) => {
console.log(positions)
  return (
    <div className={"MapPreviewContent"}>
      <MapContainer className="map" center={() => calculateCenter(positions)} zoom={() => calculateZoom(positions)} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions&&positions.map(stop =>
          <Marker key={stop.id} icon={getIcon(vehicleCategory)} position={[stop.latitude, stop.longitude]}>
            <Popup>
              {stop.name}
            </Popup>
          </Marker>)}
      </MapContainer>
    </div>
  )
}

export default MapPreview;