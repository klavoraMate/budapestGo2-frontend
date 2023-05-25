import useMultiFetch from "../../api/useMultiFetch";
import { useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { role } from '../../token/TokenDecoder';
export const NewsCreate = () => {
        const titleField = useRef();
        const descriptionField = useRef();
        const articleTextField = useRef();
        const navigate = useNavigate();
        const { data } = useMultiFetch();
        let imgDataField = null;
        const createNews = async () => {
          const titleOfNews = titleField.current.value;
          const descriptionOfNews = descriptionField.current.value;
          const articleTextOfNews = articleTextField.current.value;
          const imgDataOfNews = imgDataField;
    
          const newsURL = '/news/api/register';
          const newsObject = {
              title: titleOfNews,
              description: descriptionOfNews,
              articleText: articleTextOfNews,
              imgData:imgDataOfNews
          }
          await data(newsURL, 'POST', newsObject);
          navigate('/workspace');
        }
      
    const    onImageChange = (event) => {
          const imageFile = URL.createObjectURL(event.target.files[0]);
          createImage(imageFile, convertImage);
        };
      
        const   createImage = (imageFile, callback) => {
          const image = new Image();
          image.onload = () => callback(image, imageFile);
          image.src = imageFile;
        };
      
        const  convertImage = (image, imageFile) => {
          const canvas = drawImageToCanvas(image);
          const ctx = canvas.getContext('2d');
      
          let result = [];
          for (let y = 0; y < canvas.height; y++) {
            result.push([]);
            for (let x = 0; x < canvas.width; x++) {
              let data = ctx.getImageData(x, y, 1, 1).data;
              result[y].push(data[0]);
              result[y].push(data[1]);
              result[y].push(data[2]);
            }
          }
      
          const byteCode = convertArray(result);
          const base64String = btoa(byteCode);
          
          imgDataField = base64String;
          document.getElementById("done").style.visibility = imgDataField??  "visible";
        };
      
     

        const  drawImageToCanvas = (image) => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
          return canvas;
        };
      
        function convertArray(array) {
          return JSON.stringify(array).replace(/\[/g, '').replace(/\]/g, '');
        }

        useEffect(() => {
          if(role() !== "EMPLOYEE"){
            navigate("/map");
          }
        }, [])
        
        return (
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
              <input type="file" onChange={(event) => onImageChange(event)}/>
              <label id="done">done</label>;
            </div> 
            <button onClick={() => createNews()}>Create</button>
          </div>
        )
}
