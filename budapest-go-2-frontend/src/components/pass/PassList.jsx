import React from "react";
import { PassCard } from "./PassCard";

export const PassList = ({ passData }) => {
  return (
    <div>
      {passData.map((pass) => {
        return (
          <div className="flex justify-center items-center">
            <PassCard
              key={pass.id}
              passType={pass.passType}
              startDate={pass.startDate}
              expirationDate={pass.created}
            />
          </div>
        );
      })}
    </div>
  );
};
