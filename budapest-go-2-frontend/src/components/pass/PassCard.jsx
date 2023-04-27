import React from "react";

export const PassCard = ({key, passType, startDate, expirationDate}) => {
    const createdTime = new Date(startDate);
    const expirateTime = new Date(expirationDate);
    //  .toISOString()
    //  .substring(0, 19)
    //  .replace("T", " ");
    return (
      <div
        className="text-black w-1/2 m-4 bg-white rounded flex justify-between p-4"
        key={key}
      >
        <div>
          <p>Type: {passType}</p>
          <p>Start date: {`${createdTime} `}</p>
          <p>Expiration date: {expirateTime}</p>
        </div>
      </div>
    );
  };
  