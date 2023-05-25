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
        {isHidden && <div className={"box"}>{content.map((option) => <button onClick={option[1]} className={"menuButton"}>{option[0]}</button>)}</div>}
      </div>
    </div>
    )
}

export default DropMenu
