

export default function News(props, img) {
    return (
      <div className="articleCard">
        <img className="news--image" src={img} alt="news image" />
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p> 
         {props.articleText}
        </p> 
      </div>
    );
  }