import './confirmDialog.css';
import {useRef} from "react";
const ConfirmDialog = ({subjectOfConfirmation, confirmString, onClickMethod}) => {
    const confirmInput = useRef();
    confirmString = confirmString.replaceAll(' ', '-');
    console.log(confirmString);
    const checkMatch = () => {
        if (confirmInput.current.value === confirmString) {
            onClickMethod();
        }
    }

    return (
        <>
            <div className={"BlockLayer"}>
                <p>o</p>
            </div>
            <div className={"ConfirmPanel"}>
                <p>You have to confirm {subjectOfConfirmation} by typing "{confirmString}" to execute</p>
                <input ref={confirmInput} onChange={() => checkMatch()}/>
            </div>
        </>
    )
}

export default  ConfirmDialog;