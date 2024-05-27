import React, { useState } from 'react';
import title from './../images/title2.png';
import './../styles/Form.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

function Form() {
  const [problem, setProblem] = useState('');
  const [objective, setObjective] = useState('');
  const [solution, setSolution] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const postResultImageAPIURL = 'https://9ikcdu22ee.execute-api.us-east-1.amazonaws.com/generate-image';
  const postResultTextAPIURL = 'https://lsmso7z4czkzuwkd63rewixymq0unwel.lambda-url.us-east-1.on.aws/';
  
  const navigate = useNavigate();

  const modalCustomStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      margin: '0px',
      padding: '0px',
      transform: 'translate(-50%, -50%)',
      fontFamily: "Garaje-0703",
      fontSize: "25px",
      border: "2px solid",
      borderRight: "5px solid",
      borderBottom: "5px solid",
    },
  }

  const fetchResult = async () => {
    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 100 : prevProgress + 1));
    }, 150);
    setIsButtonDisabled(true);
    setShowModal(true);
    
    const [responseImage, responseText] = await Promise.all([
        fetch(postResultImageAPIURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: "Este es el problema: " + problem + ". Esta es una solución: " + solution + ". Y este el público objetivo: " + objective + ". Diseña una imagen de la solución de forma futurista"})
          }).then(response => response.json()),
          fetch(postResultTextAPIURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: "Este es el problema: " + problem + ". Esta es una solución: " + solution + ". Y este el público objetivo: " + objective + ". Diseña una solución futurista en formato JSON con estos dos campos: 'title' y 'solution'."})
          }).then(response => response.json())
    ]);

    clearInterval(timer);
    navigate('/result', { state: { url : responseImage, result: responseText }});
  };

  return (
    <div className="falling-rounded-page">   
        <div style={{width: "100vw", height: "100vh"}}>
          <div className="description" style={{ position: "relative", width: "50vw", left: "25vw", height: "80vh", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", paddingTop: "8vh"}}>
            <Modal 
                isOpen={showModal}      
                style={modalCustomStyle}
                overlayClassName="Overlay"
              >
                <div className="box-container">
                    <div className="box-header">
                        <span className="box-header-text"><b>GENERANDO...</b></span>
                        
                    </div>
                    <div className="box-content">
                        <span className="box-content-text"><b>GPT está generando el producto/servicio del futuro...</b></span>
                        <span className="box-content-percentage"><b>{progress}%</b></span>
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}>

                        </div>
                    </div>
                </div>
            </Modal>

            <img src={title} style={{width: "auto", height: "7vh", marginBottom: "4vh"}} />

            <div style={{display: "flex", flexDirection: "row", width: "100%", maxWidth: "60vw", fontSize: "30px", marginTop: "20px"}}>
              <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <label style={{ marginBottom: "1vh"}}><b>DESCRIBE EL PROBLEMA A RESOLVER</b></label>
                <textarea className="input-base" rows={5} value={problem} onChange={e => setProblem(e.target.value)} style={{padding: "10px"}}/>
              </div>
            </div>

            <div style={{display: "flex", flexDirection: "row", width: "100%", maxWidth: "60vw", fontSize: "30px", marginTop: "45px"}}>
              <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <label style={{ marginBottom: "1vh"}}><b>SELECCIONA A TU PÚBLICO OBJETIVO</b></label>
                <textarea className="input-base" rows={2} value={objective} onChange={e => setObjective(e.target.value)} style={{padding: "10px"}}/>
              </div>
            </div> 

            <div style={{display: "flex", flexDirection: "row", width: "100%", maxWidth: "60vw", fontSize: "30px", marginTop: "45px"}}>
              <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <label style={{ marginBottom: "1vh"}}><b>DESCRIBE UNA POSIBLE SOLUCIÓN</b></label>
                <textarea className="input-base" rows={5} value={solution} onChange={e => setSolution(e.target.value)} style={{padding: "10px"}}/>
              </div>
            </div> 
                                                                                                          
            <button type="button" className='button-base border-base' disabled={isButtonDisabled} style={{width: "15vw", height: "60px", fontSize: "30px", marginTop: "80px", paddingTop: "40px", maxWidth: "500px"}}
              onClick={fetchResult} >
              <span className="button-text">ENVIAR</span>
              <span className="button-arrow"> → </span>
            </button>
            
          </div>
        </div>
    </div>
  );
}

export default Form;