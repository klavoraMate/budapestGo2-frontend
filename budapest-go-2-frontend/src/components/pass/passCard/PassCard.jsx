import React from "react";
import "./PassCard.css";
export const PassCard = ({key, passType,passCategory, expirationDate,active}) => {
    const expirateTime = new Date(expirationDate).toISOString().substring(0, 10).replace("T", " ");
    
    return (
      <div id="passCard" key={key} >
      <div className="fluid ">
        <div >
          <div className="ticket light" id={active ? "": "expired"}>
            <div className="ticket-head text-center" >
              <div className="layer">
              <div >
              <div className="headers">
              Type : {passType} Budapest Pass
              <img className="logo" id="logos" src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" />
              {
              active ?
              <div className="statusbox">
                <div className="activebox">
                  <h4 className="active">
                    Active
                  </h4>
                </div>
                <img className="logo" id="logos2" src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />
                </div>
                : 
                <div className="statusbox">
                  <div className="inActivebox">
                    <h4 className="inActive">
                      Expired
                      </h4>
                    </div>
                  </div>
              }  
              <div id="content">
              <div className="col-xs-6">
              <h5>Expiration date:</h5>
              <h4>{`${expirateTime}`}</h4>
              </div>
              </div>
            </div>
        </div>
      </div>
    </div>    
    </div>
  </div>
  </div>
</div>);
};
