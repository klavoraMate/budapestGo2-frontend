import "./PassPurchasePage.css";
import  useMultiFetch from "../api/useMultiFetch";
import { useEffect, useState } from "react";
import{ getCookie } from "../cookie";
import { useNavigate } from "react-router-dom";
import { Pass } from "./Pass";
function PassPurchasePage() {
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(true);
    const [passCategories, setPassCategories] = useState([]);
    const [ passToPurchase, setPassToPurchase ]= useState("");
    
    const HandleSubmit = async () => {
        let data = {clientId:getCookie("id"),passType:passToPurchase};
        useMultiFetch('/pass/register','POST',data);
       /*  fetch('/pass/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId:getCookie("id"),
                passType:passToPurchase
            }),
        }); */
    };
    
    function purchasePass(passtype){
        document.getElementById("cart").style.visibility = "visible";
        setPassToPurchase(passtype);
    }
    
    async function GetCategories(){
    setPassCategories(useMultiFetch("/category/all"));
    console.log(passCategories);
    setIsFetching(false);
}

    useEffect(() => {
        if(isFetching){
        GetCategories();
        }
        console.log(passCategories);
    }, [passToPurchase]);

    return (
        <div className="purchase">
            <div className="canvas">
                {/* {passCategories && passCategories.map((passType) => {
                    return(<div className="ticket"
                    onClick={() => purchasePass(passType.category) }
                >
                    <Pass 
                    category = {passType.category}
                    categoryData =  {passType}
                    /> 
                </div>
                    );
                })} */}
            </div>
            <div id="buttonHolder">
                <div id="cart" >1x {passToPurchase}</div>
                <button
                    id="button"
                    onClick={()=>HandleSubmit()}
                >
                    Purchase
                </button>
                <button
                    id="button"
                    onClick={()=>navigate("/pass")}
                >
                    Owned Passes
                </button>
                </div>
        </div>
    );
}

export default PassPurchasePage;
