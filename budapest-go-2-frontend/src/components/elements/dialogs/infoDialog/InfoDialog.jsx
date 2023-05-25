import '../dialog.css';
const InfoDialog = ({title, description, buttonLabel, onClickMethod, onCloseMethod}) => {
  return (
    <>
      <div className={"Overlay"}/>
      <div className={"DialogPanel"}>
        <div className={"DialogTitleBar"}>
          <p className={"title"}>{title}</p>
          <p className={"exitButton"} onClick={() => onCloseMethod()}>X</p>
        </div>
        <hr className={"separatorLine"}/>
        <div className={"DialogContent"}>
          <p className={"description"}>{description}</p>
          <button onClick={() => onClickMethod()}>{buttonLabel}</button>
        </div>
      </div>
    </>
  )
}

export default  InfoDialog;