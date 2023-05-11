import './loading.css';
const Loading = () => {
    return (
        <>
            <img className={'loadingImg'} src={process.env.PUBLIC_URL + '/loading.png'} alt={'image'}/>
        </>
    )
}

export default Loading;