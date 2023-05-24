import useMultiFetch from "../../api/useMultiFetch";
import { useEffect,useState, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
//import './routeModify.css';
import Loading from "../../elements/loadingIndicator/Loading";

export const CategoryModify = () => {
    const navigate = useNavigate()
    const [listOfCategories, setListOfCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(true);
    const [currentValuesUpdated, setCurrentValuesUpdated] = useState('true');
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
      return listOfCategories.length > 0;
    };
  
     useEffect(() => {
      if(role() !== "EMPLOYEE"){
        navigate("/map");
      }
      const categoryUrl = '/category/all';
      if (isUpdated)
        (async () => setListOfCategories(await data(categoryUrl), setIsUpdated(false)))();
      if (isDataLoaded() && !isLoaded){
        setCurrentCategory(listOfCategories[0].category);
        setCurrentDuration(listOfCategories[0].passDuration);
        setCurrentPassExpireInDay(listOfCategories[0].passExpireInDay);
        setCurrentPrice(listOfCategories[0].price);  
        setIsLoaded(true);
      }
    }, [isUpdated,currentValuesUpdated])
  
    const getModifiedCategory = () => listOfCategories.filter((category) => category.id == categoryDropdown.current.value);
  
    const changeCategory = () => {
      const selectedCategory = getModifiedCategory();
      setCurrentValuesUpdated(selectedCategory);
      setCurrentCategory(selectedCategory[0].category);      
      setCurrentDuration(selectedCategory[0].passDuration);
      setCurrentPassExpireInDay(selectedCategory[0].passExpireInDay);
      setCurrentPrice(selectedCategory[0].price);
    
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
                    {listOfCategories.map((category) => <option key={category.id}>{category.id}</option>)}
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