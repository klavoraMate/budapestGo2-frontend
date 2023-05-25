import InfoDialog from "./elements/dialogs/infoDialog/InfoDialog";
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <InfoDialog title={"Page not found"} description={"404"} onClickMethod={() => navigate("/")} onCloseMethod={() => navigate("/")} buttonLabel={"Go Home"}/>
  )
}

export default NotFoundPage;