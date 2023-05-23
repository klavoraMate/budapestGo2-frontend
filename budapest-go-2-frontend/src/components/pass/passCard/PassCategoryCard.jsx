import "./PassCategoryCard.css";
export const PassCategoryCard = ({category, categoryData}) => {

return (<>
     {categoryData.map((element,key) => {
      if(element.category === category ){
      return(
      <div 
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
</>
);}