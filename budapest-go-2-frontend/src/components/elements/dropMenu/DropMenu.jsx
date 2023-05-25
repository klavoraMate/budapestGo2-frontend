import React, {useState} from "react";
import './dropMenu.css'

const DropMenu = ({title, content}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className={"menu"}>
      <div className={"title"} onMouseEnter={() => setIsHidden(true)}>
        {!isHidden && <p>{title}</p>}
      </div>
      <div onMouseLeave={() => setIsHidden(false)}>
        {isHidden && <div className={"box"}>{content.map((element) =>
          element[1] ? <button onClick={element[1]} className={"menuButton"}>{element[0]}</button>
            :            <div className={"tag"}><h4>{element[0]}</h4></div>
        )
        }</div>}
      </div>
    </div>
    )
}

export default DropMenu
