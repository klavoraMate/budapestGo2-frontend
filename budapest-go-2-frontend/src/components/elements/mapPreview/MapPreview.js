import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { getIcon } from "../../api/GetMapIcon";
import React from "react";
import "./mapPreview.css"
  const locationOfBudapest = [47.486208, 19.108459];
const calculateCenter = (positions) => {
  if (!positions || positions.length === 0)
    return locationOfBudapest;

  let latitude = 0;
  let longitude = 0;

  positions && positions.forEach((pos) => {latitude += pos.latitude; longitude += pos.longitude})
  latitude = latitude / positions.length;
  longitude = longitude / positions.length
  return [latitude.toFixed(6), longitude.toFixed(6)];
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
  return (
    <div className={"MapPreviewContent"}>
      <MapContainer className="map" center={calculateCenter(positions)} zoom={calculateZoom(positions)} zoomControl={false} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions &&
          positions.map((stop) =>
            stop.location ? (
              <Marker
                key={stop.id}
                icon={getIcon(vehicleCategory)}
                position={[stop.location.latitude, stop.location.longitude]}
              >
                <Popup>
                  {stop.name}
                </Popup>
              </Marker>
            ) : null
          )}
      </MapContainer>
    </div>
  )
}

export default MapPreview;