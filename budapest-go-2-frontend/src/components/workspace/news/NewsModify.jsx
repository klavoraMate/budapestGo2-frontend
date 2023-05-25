import useMultiFetch from "../../api/useMultiFetch";
import { useEffect,useState, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
//import './routeModify.css';
import Loading from "../../elements/loadingIndicator/Loading";

export const NewsModify = () => {
    const navigate = useNavigate()
    const [listOfNews, setListOfNews] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(true);
    const [currentValuesUpdated, setCurrentValuesUpdated] = useState(true);
    const [currentCategory, setCurrentCategory] = useState([]);
    const [currentDuration, setCurrentDuration] = useState([]);
    const [currentpassExpireInDay, setCurrentPassExpireInDay] = useState([]);
    const [currentPrice, setCurrentPrice] = useState([]);
    const { data } = useMultiFetch();
    const categoryDropdown = useRef();
    const categoryTypeField = useRef();
    const durationField = useRef();
    const expiretyField = useRef();
    const priceField = useRef();

    const isDataLoaded = () => {
      return listOfNews.length > 0;
    };
  
     useEffect(() => {
      if(role() !== "EMPLOYEE"){
        navigate("/map");
      }
      const categoryUrl = '/category/all';
      if (isUpdated)
        (async () => setListOfNews(await data(categoryUrl), setIsUpdated(false)))();
      if (isDataLoaded() && !isLoaded){
        setCurrentCategory(listOfNews[0].category);
        setCurrentDuration(listOfNews[0].passDuration);
        setCurrentPassExpireInDay(listOfNews[0].passExpireInDay);
        setCurrentPrice(listOfNews[0].price);  
        setIsLoaded(true);
      }
    }, [isUpdated,currentValuesUpdated])
  
    const getModifiedCategory = () => listOfNews.filter((category) => category.id == categoryDropdown.current.value);
  
    const changeCategory = () => {
      const categoryId = getModifiedCategory();
      setCurrentValuesUpdated(!currentValuesUpdated);
      setCurrentCategory(categoryId[0].category);      
      setCurrentDuration(categoryId[0].passDuration);
      setCurrentPassExpireInDay(categoryId[0].passExpireInDay);
      setCurrentPrice(categoryId[0].price);
    
    }
  
    const updateRoute = async () => {
      const categoryId = getModifiedCategory("id").id;
      const categoryName = categoryTypeField.current.value;
      const durationOfCategory = durationField.current.value;
      const expirationOfCategory = expiretyField.current.value;
      const priceOfCategory = priceField.current.value;
  
      const categoryUpdateURL = '/category/api';
      const categoryObject = {
        id: categoryId,
        category: categoryName,
        passDuration: durationOfCategory,
        passExpireInDay: expirationOfCategory,
        price: priceOfCategory
      }
      await data(categoryUpdateURL, 'PUT', categoryObject);
      navigate('/workspace');
    }
    if (isDataLoaded() && isLoaded) {
    return (
          <div className='pageContent'>
            <h2>Modify transportation route</h2>
            <div className='pagePanel'>
              <div className='pageElement'>
                <div className='routeDetail'>
                  <p>Select existing category:</p>
                  <select ref={categoryDropdown} onChange={() => changeCategory()}>
                    {listOfNews.map((category) => <option key={category.id}>{category.id}</option>)}
                  </select>
                  <p>Rename category type</p>
                  <input 
                    ref={categoryTypeField}
                    defaultValue={currentCategory}
                  />
                  <p>Rename category duration:</p>
                  <input 
                    ref={durationField}
                    defaultValue={currentDuration}
                  />
                  <p>Change expirety to:</p>
                  <input 
                    type="number" 
                    ref={expiretyField}
                    defaultValue={currentpassExpireInDay}  
                  />
                  <p>Change price to:</p>
                  <input 
                    type="number" 
                    ref={priceField}
                    defaultValue={currentPrice}  
                  />
                </div>
                <button onClick={() => updateRoute()}>Update</button>
              </div>
            </div>
          </div>
    )
  } else
      return <Loading/> 
}