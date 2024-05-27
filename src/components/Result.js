import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './../styles/Result.css';
import background from './../images/background.png';
import resultTitle from './../images/result-title.png';

function Result() {
    const location = useLocation();
    const image = location.state.url;
    const result = location.state.result;
    console.log(result);
    console.log(result.title);
    console.log(result.solution);
    const navigate = useNavigate();

    function finishAction() {
        navigate('/');
    }

    return (
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#C757FF"}}>
            <div className="ribon">
                <div className="ribon-text">
                    Tu arte se exhibirá en la pantalla grande        
                </div>
            </div>
            <img src={background} style={{width: "100vw", height: "100vh", position: "absolute"}} />
            <div className="description" style={{ position: "relative", width: "80vw", left: "10vw", height: "80vh", top: "10vh", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row"}}>
                <div style={{height: "100%", width: "50%", alignItems: "center", display: "flex"}}>
                    <img className="border-base" style={{ width: "100%"}}
                            src= { image }
                            alt="new"
                        />
                </div>
                
                <div style={{height: "100%", width: "50%", marginLeft: "100px", alignItems: "center", display: "flex", flexDirection: "column"}}>
                    <img src={resultTitle} style={{width: "auto", height: "13%", marginTop: "2%"}} />
                    <div style={{width: "auto", height: "65%", marginTop: "5%", display: "flex", flexDirection: "column"}}>
                        <div style={{ border: "4px solid", backgroundColor: "white", padding: "20px", fontSize: "35px", fontFamily: "Garaje0504", borderBottom: "0px", borderRadius: "15px 15px 0px 0px" }}>
                            <b>{result.title}</b>
                        </div>
                        <div style={{ border: "4px solid", backgroundColor: "white", padding: "20px", paddingLeft: "30px", paddingRight: "30px", fontSize: "30px", overflow: "auto", textAlign: "justify", borderRadius: "0px 0px 15px 15px"}}>
                        <b>{result.solution}</b>
                        </div>
                    </div>
                    <button type="button" className='button-base border-base' style={{width: "40%", height: "60px", fontSize: "30px", marginTop: "4%", maxWidth: "500px"}}
                        onClick={finishAction} >
                            <span className="button-text"> TERMINAR </span>
                            <span className="button-arrow"> → </span>     
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Result;