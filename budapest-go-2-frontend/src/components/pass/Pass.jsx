import "./Pass.css";

export const Pass = ({category, categoryData}) => {

return (
<div class="pass-ticket-visual_visual">
     {category}
     {categoryData.forEach(element => {
      if(element.category === category)
      return(
      <div>
        <div>{element.passDuration}</div>
        <div>{element.price}</div>
      </div>)  
     })};
    
</div>
);}