import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { getIcon } from "../../api/GetMapIcon";
import React, {forwardRef, useEffect, useState} from "react";
import './mapEditor.css'

const MapEditor = forwardRef(({onClick, markerKey }, ref) => {
  const locationOfBudapest = [47.486208, 19.108459];
  const [markerPosition, setMarkerPosition] = useState({lat: locationOfBudapest[0], lng: locationOfBudapest[1]});

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.value = markerPosition;
    }
  }, [ref, markerPosition]);

  return (
    <div className={"mapContent"}>
      <MapContainer zoomControl={false} className="map" center={locationOfBudapest} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          key={markerKey}
          position={markerPosition ?? locationOfBudapest}
          icon={getIcon( "default")}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const LatLng = e.target.getLatLng();
              const pos = {lat: Number(LatLng.lat), lng: Number(LatLng.lng)};
              setMarkerPosition(pos??locationOfBudapest);
              onClick();
            }
          }}
        >
        </Marker>
      </MapContainer>
    </div>
  );
});

export default MapEditor;
