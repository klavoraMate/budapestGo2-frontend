import "./PassPurchasePage.css";
import { useEffect, useState } from "react";
import{ getCookie } from "../cookie";
import { useNavigate } from "react-router-dom";
import { Pass } from "./Pass";
function PassPurchasePage() {
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(true);
    const [passCategories, setPassCategories] = useState([]);
    const [ passToPurchase, setPassToPurchase ]= useState("");
    let displayedCategory = [];
    const HandleSubmit = async () => {
     
           let data = {clientId:getCookie("id"),passType:passToPurchase};
        //useMultiFetch('/pass/register','POST',data);
       fetch('/pass/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId:getCookie("id"),
                passDuration:passToPurchase[0],
                passCategory:passToPurchase[1]
            }),
        }); 
    };
    
    function purchasePass(passtype){
        let passToPurchaseData = passtype.split(',');
        document.getElementById("cart").style.visibility = "visible";
        setPassToPurchase(passToPurchaseData);
        console.log(passToPurchase[0]);
        console.log(passToPurchase[1]);
        console.log(getCookie("id"));
    }
        const GetCategories = async () => {
        const data = await fetch("/category/all");
        setPassCategories(await data.json());
        setIsFetching(false);
    }  

    useEffect(() => {
        if(isFetching){
        GetCategories();
        }
    }, [passToPurchase]);

    return (
        <div className="purchase">
            <div className="canvas">
                 {passCategories && passCategories.map((passType) => {
                      if(!displayedCategory.includes(passType.category)) {
                        displayedCategory.push(passType.category);
                        return(
                    <div 
                    key={passType.id} 
                    className="ticket"
                    onClick={(e)=> purchasePass(e.target.textContent)}
                >
                    <Pass 
                    category = {passType.category}
                    categoryData = {passCategories}
                    /> 
                </div>)
                    }
                })
                }
            </div>
            <div id="buttonHolder">
                <div id="cart" >1x {passToPurchase[1]}  {passToPurchase[0]}</div>
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
