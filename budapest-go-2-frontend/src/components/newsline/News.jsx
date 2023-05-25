import { useNavigate } from "react-router-dom";
import './News.css'
export const News = ({data}) => {
  const navigate = useNavigate();
    return (
   <div className="card" key={data.id}>
           <img className="news--image" id="previewImg" src={"data:image/png;base64,"+data.imgData} alt="news image" />
        <h2>{data.title}</h2>
        <p >{data.description}</p>
        <p> 
          <button onClick={() => navigate(`/article/${data.title}`)}>Read more</button>
        </p> 
      </div>
    );
}
