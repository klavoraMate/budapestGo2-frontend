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
    const [currentTitleUpdated, setCurrentTitleUpdated] = useState(true);
    
    const { data } = useMultiFetch();
    const titleDropdown = useRef();
    const titleTypeField = useRef();
    const descriptionField = useRef();
    const articleTextField = useRef();
    let imgField = '';

    const isDataLoaded = () => {
      return listOfNews.length > 0;
    };
  
     useEffect(() => {
      if(role() !== "EMPLOYEE"){
        navigate("/map");
      }
      const newsUrl = '/news/api/all';
      if (isUpdated)
        (async () => setListOfNews(await data(newsUrl), setCurrentTitleUpdated(await data(newsUrl)),setIsUpdated(false)))();
      if (isDataLoaded() && !isLoaded){
        setIsLoaded(true);
      }
    }, [isUpdated,currentTitleUpdated])
  
    const getModifiedNews = () => listOfNews.filter((news) => news.title === titleDropdown.current.value);
  
    const changeCategory = () => {
      const newsId = getModifiedNews();
      setCurrentTitleUpdated(newsId);
      setIsLoaded(false);
    }

  async function getByteArray(event) {
      let myFile = event.target.files[0];
      let byteArray = await fileToByteArray(myFile);
      
      console.log(byteArray);
      imgField = byteArray;
  }
  
  function fileToByteArray(file) {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            let fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt) => {
                if (evt.target.readyState == FileReader.DONE) {
                    let arrayBuffer = evt.target.result,
                    array = new Uint8Array(arrayBuffer);
                    for (let i = 0; i < array.length; i++) {
                        fileByteArray.push(array[i]);
                    }
                }
                resolve(fileByteArray);
            }
        }
        catch (e) {
            reject(e);
        } 
    })
}
  
    const updateRoute = async () => {
      const newsTitle = titleTypeField.current.value;
      const newsDescription = descriptionField.current.value;
      const newsArticleText = articleTextField.current.value;
      const newsImgData = imgField.current.value;
  
      const newsUpdateURL = '/news/api';
      const newsObject = {
        title: newsTitle,
        description: newsDescription,
        articleText: newsArticleText,
        imgField: newsImgData
      }
      await data(newsUpdateURL, 'PUT', newsObject);
      navigate('/workspace');
    }
    if (isDataLoaded() && isLoaded) {
    return (
          <div className='pageContent'>
            <h2>Modify news article</h2>
            <div className='pagePanel'>
              <div className='pageElement'>
                <div className='routeDetail'>
                  <p>Select existing article:</p>
                  <select ref={titleDropdown} defaultValue={currentTitleUpdated[0].title} onChange={() => changeCategory()}>
                    {listOfNews.map((news) => <option key={news.id}>{news.title}</option>)}
                  </select>
                  <p>Rename article title</p>
                  <input 
                    ref={titleTypeField}
                    defaultValue={currentTitleUpdated[0].title}
                  />
                  <p>Change article description:</p>
                  <textarea
                    ref={descriptionField}
                    defaultValue={currentTitleUpdated[0].description}
                  />
                  <p>Change article text:</p>
                  <textarea 
                    ref={articleTextField}
                    defaultValue={currentTitleUpdated[0].articleText}  
                  />
                  <p>Change image to:</p>
                  <input type="file" onChange={(event) => getByteArray(event)}/>
                </div>
                <button onClick={() => updateRoute()}>Update</button>
              </div>
            </div>
          </div>
    )
  } else
      return <Loading/> 
}