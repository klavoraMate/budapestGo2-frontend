import useMultiFetch from "../../api/useMultiFetch";
import { useEffect,useState, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
import './ArticleEditor.css';
import Loading from "../../elements/loadingIndicator/Loading";
import ConfirmDialog from "../../elements/dialogs/confirmDialog/ConfirmDialog";
import InfoDialog from "../../elements/dialogs/infoDialog/InfoDialog";
export const NewsModify = () => {
    const navigate = useNavigate()
    const [listOfNews, setListOfNews] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(true);
    const [isDeletion, setDeletion] = useState(false);
    const [currentTitleUpdated, setCurrentTitleUpdated] = useState(true);
    const { data } = useMultiFetch();
    const titleDropdown = useRef();
    const titleTypeField = useRef();
    const descriptionField = useRef();
    const articleTextField = useRef();
    let imageField = '';

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
      imageField = byteArray;
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
const handleDeleteButtonClick = async () => {
  currentTitleUpdated[0].id && await deleteNewsById(currentTitleUpdated[0].id);
  setDeletion(false);
  navigate("/workspace")
}
const deleteNewsById = async (id) => {
  const newsUrl = '/news/api/' + id;
  await data(newsUrl, 'DELETE');
}
    const updateNews = async () => {
      const newsTitle = titleTypeField.current.value;
      const newsDescription = descriptionField.current.value;
      const newsArticleText = articleTextField.current.value;
  
      const newsUpdateURL = '/news/api';
      const newsObject = {
        id:currentTitleUpdated[0].id,
        title: newsTitle,
        description: newsDescription,
        articleText: newsArticleText,
        imgData: imageField.length > 1 ? imageField : currentTitleUpdated[0].imgData
      }
      await data(newsUpdateURL, 'PUT', newsObject);
      navigate('/workspace');
    }
    if (isDataLoaded() && isLoaded) {
    return (
          <div><div className='pageContent'>
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
                  <input className='upload' type="file" onChange={(event) => getByteArray(event)}/>
                </div>
                <button onClick={() => updateNews()}>Update</button>
                <div>
                {!isDeletion && <button className={"alertButton"} onClick={() => setDeletion(true)}>Delete</button>}
                </div>
              </div>
            </div>
            {isDeletion && <ConfirmDialog category={"Article"}
                                      confirmString={titleDropdown.current && titleDropdown.current.value}
                                      onClickMethod={() => handleDeleteButtonClick()}
                                      onCloseMethod={() => setDeletion(false)}/>
        }
          </div>
          <div className="content">
          {currentTitleUpdated[0].imgData && 
           <div className="articleCard">
           <h1 id="title">{currentTitleUpdated[0].title}</h1>
           <h3 id="desc">{currentTitleUpdated[0].description}</h3>
          <img id="articleImg" src={"data:image/png;base64,"+currentTitleUpdated[0].imgData} alt="news image" />
          <div id="text"> 
            {currentTitleUpdated[0].articleText}
          </div>
          </div>  }</div>
          </div>
    )
  }else if(isLoaded && listOfNews.length < 1){
    return <InfoDialog title={"News modification"}
    description={"There is no existing news in the database to modify."}
    buttonLabel={"Go Workspace"} onClickMethod={() => navigate("/workspace")}
    onCloseMethod={() => navigate("/workspace")}/>;
  }
   else
      return <Loading/> 
}