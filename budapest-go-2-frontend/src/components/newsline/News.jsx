export default function News(props) {
    return (
      <div className="card">
        <img className="news--image" src={props.url} alt="news image" />
        <h2>{props.title}</h2>
        <p className="price">{props.price}</p>
        <p>{props.description}</p>
        <p> 
          <button>Read more</button>
        </p> 
      </div>
    );
  }