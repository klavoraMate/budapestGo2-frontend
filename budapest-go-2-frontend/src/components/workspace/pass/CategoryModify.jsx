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
      if (isUpdated){
        (async () => setListOfCategories(await data(categoryUrl),setCurrentValuesUpdated(await data(categoryUrl)), setIsUpdated(false)))();
      }
      if (isDataLoaded() && !isLoaded){
        setIsLoaded(true);
      }
    }, [isUpdated,currentValuesUpdated])
    
    const getModifiedCategory = () => (setCurrentValuesUpdated('thi'), listOfCategories.filter((category) => category.id == categoryDropdown.current.value));
    
    const changeCategory = () => {
      const selectedCategory = getModifiedCategory();
      setCurrentValuesUpdated(selectedCategory);
      setIsLoaded(false);
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
            <h2>Modify pass category</h2>
            <div className='pagePanel'>
              <div className='pageElement'>
                <div className='routeDetail'>
                  <p>Select existing category:</p>
                  <select 
                    ref={categoryDropdown} 
                    onChange={() => changeCategory()}
                    defaultValue={currentValuesUpdated[0].id}
                    >
                    {listOfCategories.map((category) => 
                    <option key={category.id} >{category.id}</option>)}
                  </select>
                  <p>Rename category type</p>
                  <input 
                    ref={categoryTypeField}
                    defaultValue={currentValuesUpdated[0].category}
                  />
                  <p>Rename category duration:</p>
                  <input 
                    ref={durationField}
                    defaultValue={currentValuesUpdated[0].passDuration}
                  />
                  <p>Change expirety to:</p>
                  <input 
                    type="number" 
                    ref={expiretyField}
                    defaultValue={currentValuesUpdated[0].passExpireInDay}  
                  />
                  <p>Change price to:</p>
                  <input 
                    type="number" 
                    ref={priceField}
                    defaultValue={currentValuesUpdated[0].price}  
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