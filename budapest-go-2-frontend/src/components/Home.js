import './Home.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {News} from "./newsline/News";
import { useNavigate } from 'react-router-dom';
import useMultiFetch from './api/useMultiFetch';
import { useEffect, useState } from 'react';
import Loading from './elements/loadingIndicator/Loading';
const Home = () => {
  const navigate = useNavigate();
  const { data } = useMultiFetch();
  const [newsList, setNewsList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
 
  async function fetchActiveData() {
    setIsFetching(true);
    const response = await data(`/news/api/all`);
    setNewsList(await response);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchActiveData();
}, []);
      
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 524, min: 300 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },};

    return (
        <div className='pageContent'>
            <h1>Budapest Go 2</h1>
            <div className="Home">
            {isFetching ? (
              <Loading/>
        ) : newsList.length > 0 ? (
          <Carousel showDots={true} responsive={responsive}>
           {newsList&& newsList.map((article) => {
           return( <News data={article}/>)})}
          </Carousel>   
           ) : ( <div id="noData">
          <p>No data</p>
        </div>)}
        </div>
        </div>
    )
}

export default Home;