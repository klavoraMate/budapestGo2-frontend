import useMultiFetch from "../../api/useMultiFetch";
import { useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';

export const CategoryCreate = () => {
        const categoryField = useRef();
        const passDurationField = useRef();
        const passExpireInDayField = useRef();
        const priceField = useRef();
        const navigate = useNavigate();
        const { data } = useMultiFetch();
      
        const createCategory = async () => {
          const categoryOfCategory = categoryField.current.value;
          const passDuration = passDurationField.current.value;
          const passExpiration = passExpireInDayField.current.value;
          const price = priceField.current.value;
          const categoryURL = '/category/api/register';
          const categoryObject = {
              category: categoryOfCategory,
              passDuration: passDuration,
              passExpireInDay: passExpiration,
              price:price
          }
          await data(categoryURL, 'POST', categoryObject);
          navigate('/workspace');
        }
      
        useEffect(() => {
          if(role() !== "EMPLOYEE"){
            navigate("/map");
          }
        }, [])
        
        return (
          <div className='pageContent'>
            <h2>Create new pass category</h2>
            <div className='routeDetail'>
              <p>Set name of new category:</p>
              <input type='text' ref={categoryField}></input>
            </div>
            <div className='routeDetail'>
              <p>Set durtaion name of new category:</p>
              <input type='text' ref={passDurationField}></input>
            </div>
            <div className='routeDetail'>
              <p>New category expire in:</p>
              <input type='number' ref={passExpireInDayField}></input>
            </div>
            <div className='routeDetail'>
              <p>New category price:</p>
              <input type='number' ref={priceField}></input>
            </div>
            <button onClick={() => createCategory()}>Create</button>
          </div>
        )
}
