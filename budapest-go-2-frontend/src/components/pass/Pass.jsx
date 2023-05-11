import { useEffect, useState } from "react";
import "./Pass.css";

export const Pass = ({category, categoryData}) => {
  const[isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    
}, [isHidden]);
return (<>
<div className="pass_category" onClick={() => setIsHidden(!isHidden)}>
     {category}
</div>
<div >
     {categoryData.map((element) => {
      if(element.category === category){
      return(
      <div 
      style={{ display: isHidden ? "none" : "block" }}
      className="pass_visual">
        <div>{element.passDuration}</div>
        <div>{element.price}</div>
      </div>);}
      else{
        return (<></>)
      }  
     })}
</div></>
);}