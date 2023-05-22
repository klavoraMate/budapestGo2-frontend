import "./PassPurchasePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PassCategoryCard } from "./PassCategoryCard";
import { token } from "../token/TokenDecoder";
import { email } from "../../token/TokenDecoder";
function PassPurchasePage() {
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(true);
    const [passCategories, setPassCategories] = useState([]);
    const [ passToPurchase, setPassToPurchase ]= useState("");
    let displayedCategory = [];
    const HandleSubmit = async () => {
     
        //let data = {clientId:id(),passType:passToPurchase};
        //useMultiFetch('/pass/register','POST',data);
       fetch('/pass/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token()}`,
            },
            body: JSON.stringify({
                clientId:email(),
                passDuration:passToPurchase[0],
                passCategory:passToPurchase[1]
            }),
        }); 
    };
    
    function purchasePass(passtype){
        let passToPurchaseData = passtype.split(',');
        document.getElementById("cart").style.visibility = "visible";
        setPassToPurchase(passToPurchaseData);
    }

    const GetCategories = async () => {
            try {
            const response = await fetch('/category/all', {
                headers: {
                  'Authorization': `Bearer ${token()}`,
                },
              });
              const data = await response.json();
              setPassCategories(data);
              setIsFetching(false);
        } catch (error) {
            console.error(error);
        }
    }  

    useEffect(() => {
        if(isFetching){
        GetCategories();
        }
    }, [passToPurchase]);

    return (
        <div id="purchase">
            <div className="canvas">
                 {passCategories && passCategories.map((passType,key) => {
                      if(!displayedCategory.includes(passType.category)) {
                        displayedCategory.push(passType.category);
                        return(
                    <div 
                    key={key} 
                    className="ticket"
                    onClick={(e)=> purchasePass(e.target.textContent)}
                    >
                    <PassCategoryCard 
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
