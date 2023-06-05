import "./PassPurchasePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PassCategoryCard } from "../passCard/PassCategoryCard";
import { email } from "../../token/TokenDecoder";
import useMultiFetch from "../../api/useMultiFetch";
function PassPurchasePage() {
    const { data } = useMultiFetch();
    const navigate = useNavigate();
    const[isHidden, setIsHidden] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const [passCategories, setPassCategories] = useState([]);
    const [ passToPurchase, setPassToPurchase ]= useState("");
    let displayedCategory = [];

    const HandleSubmit = async () => {
        if(passToPurchase.length > 1){
            let request = {email:email(),passDuration:passToPurchase[0],passCategory:passToPurchase[1]};
            await data('/pass/register','POST',request);
        }
    };
    
    function purchasePass(passtype){
        let passToPurchaseData = passtype.split(',');
        document.getElementById("cart").style.visibility = "visible";
        setPassToPurchase(passToPurchaseData);
    }

    function changeVisibility(){
        setIsHidden(!isHidden);
      }

    const GetCategories = async () => {
            try {
              const response = await data('/category/all');
              setPassCategories(response);
              setIsFetching(false);
        } catch (error) {
            console.error(error);
        }
    }  

    useEffect(() => {
        if(isFetching){
        GetCategories();
        }
    }, [passToPurchase,isHidden]);

    return (
        <div id="purchase">
            <div className="notify" style={{ display: !isHidden ? "none" : "block" }}>
                You have to select a category to be able to buy it
            </div>
              <div id="buttonHolder">
                <div id="cart" >1x {passToPurchase[1]}  {passToPurchase[0]}</div>
                <button id="button" onClick={()=>HandleSubmit()} >
                    Purchase
                </button>
                <button id="button" onClick={()=>navigate("/pass")}>
                    Owned Passes
                </button>
            </div>
            <div className="canvas">
                 {passCategories && passCategories.map((passType,key) => {
                      if(!displayedCategory.includes(passType.category)) {
                        displayedCategory.push(passType.category);
                        return(
                    <div key={key} className="ticket" onClick={(e)=> purchasePass(e.target.textContent)}>
                    <div className="pass_category"  onClick={() => changeVisibility()}>
                        {passType.category}
                    <PassCategoryCard 
                        className="pass_visual"
                        style={{ display: isHidden ? "none" : "block" }}
                        category = {passType.category}
                        categoryData = {passCategories}
                    /> 
                    </div>
                </div>)}})}
            </div>
        </div>
    );
}

export default PassPurchasePage;
