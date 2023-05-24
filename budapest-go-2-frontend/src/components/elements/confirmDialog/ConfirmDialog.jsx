import './confirmDialog.css';
import {useRef} from "react";
const ConfirmDialog = ({category, confirmString, onClickMethod, onCloseMethod}) => {
    const confirmInput = useRef();
    const confirmStringWithIdentifierAndHyphen = confirmString && `delete/${category.toLowerCase()}/${confirmString.replaceAll(' ', '-').toLowerCase()}`;
    const checkMatch = () => {
        if (confirmInput.current.value === confirmStringWithIdentifierAndHyphen) {
            onClickMethod();
        }
    }

    return (
        <>
            <div className={"BlockLayer"}/>
            <div className={"ConfirmPanel"}>
                <p className={"title"}>Delete {category}</p>
                <p className={"exitButton"} onClick={() => onCloseMethod()}>X</p>
                <hr className={"separatorLine"}/>
                <p className={"descTitle"}>You have to confirm deletion by typing</p>
                <h3 className={"confirmString"}>"{confirmStringWithIdentifierAndHyphen}"</h3>
                <input className={"confirmInput"} onChange={() => checkMatch()} ref={confirmInput}/>
            </div>
        </>
    )
}

export default  ConfirmDialog;