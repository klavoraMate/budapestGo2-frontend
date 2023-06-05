import { useNavigate } from "react-router-dom";
import './News.css'
export const News = ({data}) => {
  console.log(data.imgData);
  const navigate = useNavigate();
  const maxLengthOfArticleCardTextHolder = 42;
  const subDescription = data.description.length > maxLengthOfArticleCardTextHolder ? 
                         data.description.substring(0,41).slice(0,-3).concat("...") : data.description; 
    return (
   <div className="card" key={data.id}>
           <img className="news--image" id="previewImg" src={"data:image/png;base64,"+data.imgData} alt="news image" />
        <h2>{data.title}</h2>
        <p id="textDesc">{subDescription}</p>
        <p> 
          <button onClick={() => navigate(`/article/${data.title}`)}>Read more</button>
        </p> 
      </div>
    );
}
