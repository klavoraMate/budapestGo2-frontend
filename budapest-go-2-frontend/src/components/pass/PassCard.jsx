import React from "react";
import "./PassCard.css";
export const PassCard = ({key, passType, startDate, expirationDate}) => {
    const createdTime = new Date(startDate).toISOString().substring(0, 10).replace("T", " ");
    const expirateTime = new Date(expirationDate).toISOString().substring(0, 10).replace("T", " ");
    return (
      <div
        id="passCard"
        key={key}
      >
        <div id="passData">
          <p>Type: {passType}</p>
          <p>Start date: {`${createdTime} `}</p>
          <p>Expiration date: {`${expirateTime}`}</p>
        </div>
      </div>
    );
  };
  