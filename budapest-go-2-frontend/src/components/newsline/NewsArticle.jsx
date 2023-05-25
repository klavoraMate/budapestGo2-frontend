import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from '../elements/loadingIndicator/Loading';
import useMultiFetch from '../api/useMultiFetch';
import './NewsArticle.css'
export default function NewsArticle() {
  const { id } = useParams();
  const { data } = useMultiFetch();
  const [article, setArticle] = useState([]);
  
  async function fetchArticle() {
      const response = await data(`/news/api/${id}`);
      setArticle(response);
  }

  useEffect(() => {
      fetchArticle();
      document.body.style.overflow = "visible";
  }, []);

  if (article.length < 0) {
      return <Loading />;
  }else
  return (
      <div className="articleCard">
        <h1 id="title">{article.title}</h1>
        <h3 id="desc">{article.description}</h3>
        <img id="articleImg" src={"data:image/png;base64,"+article.imgData} alt="news image" />
        <h4 id="text"> 
         {article.articleText}
        </h4> 
      </div>
    );
  }