import React from "react";
import { PassCard } from "./PassCard";

export const PassList = ({ passData }) => {
  console.log(passData);
  return (
    <div id="passListContainer">
      {passData && passData.map((pass) => {
        return (
          <div className="flex justify-center items-center">
            <PassCard
              key={pass.id}
              passType={pass.passType}
              startDate={pass.startDate}
              expirationDate={pass.expirationDate}
            />
          </div>
        );
      })}
    </div>
  );
};
