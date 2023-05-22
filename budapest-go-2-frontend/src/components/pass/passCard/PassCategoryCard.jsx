import { useEffect, useState } from "react";
import "./PassCategoryCard.css";
export const PassCategoryCard = ({category, categoryData}) => {
  const[isHidden, setIsHidden] = useState(true);
  
  function changeVisibility(){
    setIsHidden(!isHidden);
    isHidden ? document.getElementById("purchase").style.top = '60%': document.getElementById("purchase").style.top = '50%';
  }

  useEffect(() => {
}, [isHidden]);

return (<>
<div className="pass_category" onClick={() => changeVisibility()}>
     {category}
</div>
<div >
     {categoryData.map((element,key) => {
      if(element.category === category ){
      return(
      <div 
      style={{ display: isHidden ? "none" : "block" }}
      className="pass_visual"
      key={key}
      >
        <div >
          {element.passDuration} 
          <h6 className="category">
          ,{element.category},</h6>
          {element.price}
        </div>
      </div>);
    }  
    })}
</div></>
);}