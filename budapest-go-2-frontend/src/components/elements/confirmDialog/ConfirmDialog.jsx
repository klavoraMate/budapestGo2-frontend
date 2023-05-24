import './confirmDialog.css';
import {useRef} from "react";
const ConfirmDialog = ({category, confirmString, onClickMethod, onCloseMethod}) => {
    const confirmInput = useRef();
    const confirmStringWithHyphen = confirmString.replaceAll(' ', '-').toLowerCase();
    console.log(confirmString);
    const checkMatch = () => {
        if (confirmInput.current.value === confirmStringWithHyphen) {
            onClickMethod();
        }
    }

    return (
        <>
            <div className={"BlockLayer"}/>
            <div className={"ConfirmPanel"}>
                <p className={"title"}>Delete {category}</p>
                <p className={"exitButton"} onChange={() => onCloseMethod()}>X</p>
                <hr className={"separatorLine"}/>
                <p className={"descTitle"}>You have to confirm deletion by typing</p>
                <h3 className={"confirmString"}>"delete/{category.toLowerCase()}/{confirmStringWithHyphen}"</h3>
                <input className={"confirmInput"} onChange={() => checkMatch()} ref={confirmInput}/>
            </div>
        </>
    )
}

export default  ConfirmDialog;