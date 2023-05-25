import '../dialog.css';
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
            <div className={"Overlay"}/>
            <div className={"DialogPanel"}>
                <div className={"DialogTitleBar"}>
                    <p className={"title"}>Delete {category}</p>
                    <p className={"exitButton"} onClick={() => onCloseMethod()}>X</p>
                </div>
                <hr className={"separatorLine"}/>
                <div className={"DialogContent"}>
                    <p>You have to confirm deletion by typing</p>
                    <h3 className={"confirmString"}>"{confirmStringWithIdentifierAndHyphen}"</h3>
                    <input className={"confirmInput"} onChange={() => checkMatch()} ref={confirmInput}/>
                </div>
            </div>
        </>
    )
}

export default  ConfirmDialog;