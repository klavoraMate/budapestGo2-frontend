import L from "leaflet";
export const getIcon = ({vehicleCategory}) => {
  const iconName = "-marker-icon.png";
  const publicPath = process.env.PUBLIC_URL + "/map/";
  const iconPath = publicPath + (vehicleCategory?.toLowerCase() ?? "default") + iconName;

  return L.icon({
    iconUrl: iconPath,
    iconSize: [25, 41]
  })
}