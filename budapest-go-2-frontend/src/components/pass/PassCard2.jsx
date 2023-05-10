import React from "react";
import "./PassCard2.css";
export const PassCard = ({key, passType, startDate, expirationDate,active}) => {
    const createdTime = new Date(startDate).toISOString().substring(0, 10).replace("T", " ");
    const expirateTime = new Date(expirationDate).toISOString().substring(0, 10).replace("T", " ");
   
    return (
      <div
      id="passCard"
      key={key}
      >
        <div className="container-fluid box">
<div className="col-sm-6 text-right" >
  <div className="ticket light" id={active ? "": "expired"}>
    <div className="ticket-head text-center" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/bg_15.png)'}}>
      <div className="layer"></div>
      <div className="from-to ams">
        <span className="icon icon-airplane"></span> Budapest
      </div>
    </div>
    <div className="ticket-body">
      <div className="passenger">
        <p>passenger</p>
        <h4>michelle doe</h4>
      </div>
      {active ? <h5 className="active">Active</h5> : <h5 className="inActive">Expired</h5>}
      <div className="flight-info row">
        <div className="col-xs-6">
            <p>Type</p>
            <h4>{passType}</h4>
        </div>
        <div className="col-xs-6">
            <p>Start date:</p>
            <h4>{`${createdTime} `}</h4>
            <p>Expiration date:</p>
            <h4>{`${expirateTime}`}</h4>
        </div>
        </div>    
  </div></div>
</div>
</div>
</div>
    );
};
