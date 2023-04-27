import "./PassPurchasePage.css";
import{ getCookie } from "../cookie";
import { useNavigate } from "react-router-dom";

function PassPurchasePage() {
    const navigate = useNavigate();
    let passToPurchase = "";
    const handleSubmit = async () => {
        fetch('/pass/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId:getCookie("id"),
                passType:passToPurchase
            }),
        });
    };
    function purchasePass(passtype){
        passToPurchase = passtype;
    }

    return (
        <div className="purchase">
            <div className="canvas">
                <div className="ticket"
                    onClick={() => purchasePass("DAILY") }
                >
                    <h2>Daily Pass</h2> 
                    <h3>300 Ft</h3>
                </div>
                <div className="ticket"
                    onClick={() => purchasePass("WEEKLY") }
                >
                    <h2>Weekly Pass</h2> 
                    <h3>2000 Ft</h3>
                </div>
                <div className="ticket"
                     onClick={() => purchasePass("MONTHLY") }
                >
                    <h2>Monthly Pass</h2> 
                    <h3>9000 Ft</h3>
                </div>
            </div>
            <div id="buttonHolder">
                <button
                    id="button"
                    onClick={()=>handleSubmit()}
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
