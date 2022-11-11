import { FunctionComponent } from "react";


interface LoadingProps {

}

const Loading: FunctionComponent<LoadingProps> = () => {
    return (
        <div className="loading">
            <div className="loading-screen">
                <div className="lds-heart">
                    <div>  </div>
                </div>
                <p>Hi Babi!</p>
            </div>
            <iframe src="http://127.0.0.1:5500/haha.html" frameBorder="0" width={"100%"} height={"100%"}></iframe> 
        </div>
    );
}

export default Loading;