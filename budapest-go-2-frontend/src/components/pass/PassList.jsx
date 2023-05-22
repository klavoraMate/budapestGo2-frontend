import React from "react";
import { PassCard } from "./PassCard";

export const PassList = ({ passData ,active}) => {
  return (
    <div id="passListContainer">
      {passData && passData.map((pass,id) => {
        return (
          <div className="row" key={id}>
            <PassCard
              key={pass.id}
              passCategory ={pass.category}
              passType={pass.passType}
              expirationDate={pass.expirationDate}
              active={active}
            />
          </div>
        );
      })}
    </div>
  );
};
