import './Home.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import News from "./newsline/News";
import { newsData, responsive } from "./newsline/NewsData";
const Home = () => {
    const news = newsData.map((item) => (
        <News
          name={item.name}
          url={item.imageurl}
          price={item.price}
          description={item.description}
        />
      ));
    
    return (
        <div className='pageContent'>
            <h1>Budapest Go 2</h1>
            <div className="Home">
          <Carousel showDots={true} responsive={responsive}>
            {news}
          </Carousel>
        </div>
        </div>
    )
}

export default Home;