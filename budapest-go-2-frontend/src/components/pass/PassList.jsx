import React from "react";
import { PassCard } from "./PassCard2";

export const PassList = ({ passData ,active}) => {
  return (
    <div id="passListContainer">
      {passData && passData.map((pass) => {
        return (
          <div className="row">
            <PassCard
              key={pass.id}
              passType={pass.passType}
              startDate={pass.startDate}
              expirationDate={pass.expirationDate}
              active={active}
            />
          </div>
        );
      })}
    </div>
  );
};
