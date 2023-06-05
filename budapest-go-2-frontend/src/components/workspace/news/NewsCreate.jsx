import "./ArticleEditor.css";
import useMultiFetch from "../../api/useMultiFetch";
import { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
export const NewsCreate = () => {
        const { data } = useMultiFetch();
        const navigate = useNavigate();
        const titleField = useRef();
        const descriptionField = useRef();
        const articleTextField = useRef();
        const [imgDataField, setImgDataField ]= useState('');
        
        const createNews = async () => {
          const titleOfNews = titleField.current.value;
          const descriptionOfNews = descriptionField.current.value;
          const articleTextOfNews = articleTextField.current.value;
    
          const newsURL = '/news/api/register';
          const newsObject = {
              title: titleOfNews,
              description: descriptionOfNews,
              articleText: articleTextOfNews,
              imgData:imgDataField
          }
          await data(newsURL, 'POST', newsObject);
          navigate('/workspace');
        }
   
        async function getByteArray(event) {
          let myFile = event.target.files[0];
          let byteArray = await fileToByteArray(myFile);
          setImgDataField(byteArray);
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


        useEffect(() => {
          if(role() !== "EMPLOYEE"){
            navigate("/map");
          }
        }, [])
        
        return (
          <div>
          <div className='pageContent'>
            <h2>Create new news article</h2>
            <div className='routeDetail'>
              <p>Set the title of the article:</p>
              <input type='text' ref={titleField}></input>
            </div>
            <div className='routeDetail'>
              <p>Set the description of the article:</p>
              <textarea className="descriptionArea" ref={descriptionField} />
            </div>
            <div className='routeDetail'>
              <p>Set the text of the article:</p>
             <textarea className="articleTextArea" ref={articleTextField} />
            </div>
             <div className='routeDetail'>
              <p>Set picture of the article:</p>
              <input className='upload' type="file" onChange={(event) => getByteArray(event)}/>
            </div> 
            <button onClick={() => createNews()}>Create</button>
          </div>
          </div>
        )
}
