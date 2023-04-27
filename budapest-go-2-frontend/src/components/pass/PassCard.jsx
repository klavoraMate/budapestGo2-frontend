import React from "react";

export const PassCard = ({key, passType, startDate, expirationDate}) => {
    const createdTime = new Date(startDate).toISOString().substring(0, 10).replace("T", " ");
    const expirateTime = new Date(expirationDate).toISOString().substring(0, 10).replace("T", " ");
    return (
      <div
        id="passCard"
        key={key}
      >
        <div>
          <p>Type: {passType}</p>
          <p>Start date: {`${createdTime} `}</p>
          <p>Expiration date: {`${expirateTime}`}</p>
        </div>
      </div>
    );
  };
  