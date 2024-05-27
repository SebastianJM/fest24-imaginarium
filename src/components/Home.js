import React from 'react';
import background from './../images/background.png';
import title from './../images/title.png';
import example1 from './../images/example1.png';
import example2 from './../images/example2.png';
import './../styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{display: "flex", width: "100vw", height: "100vh", backgroundColor: "#C757FF"}}>
        <img src={background} style={{width: "100vw", height: "100vh", position: "absolute"}} />  
        <img src={example1} className="floating-image-upwards" style={{width: "24vw", height: "auto", left: "5vw", top: "16vh"}} />
        <img src={example2} className="floating-image-downwards" style={{width: "24vw", height: "auto", left: "23vw", top: "30vh"}} />
        <img src={title} style={{width: "75vw", height: "55vh", position: "absolute", left: "17vw", top: "20vh"}} />
        <Link to="/form" style={{width: "12vw", position: "absolute", left: "65vw", top: "68vh"}}>
            <button type="button" className='button-base border-base' style={{width: "100%", height: "60px", fontSize: "30px", marginTop: "4vh"}}>
                <span className="button-text"> COMENZAR </span>
                <span className="button-arrow"> → </span>
            </button>
        </Link>
    </div>
  );
}

export default Home;
