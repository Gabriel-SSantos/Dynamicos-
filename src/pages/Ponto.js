import { useLocation, useNavigate } from "react-router-dom"
import {useState, useEffect } from "react";
import style from "../layout/styles/ponto.module.css"
export default function Ponto(){
    const location = useLocation()
    const navigate = useNavigate()
    const dadosRecebido = location.state
    
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    
    useEffect(() => {
      let interval = null;
  
      if (isActive) {
      
        interval = setInterval(() => {
         
          setSeconds(prevSeconds => prevSeconds - 1);
          if(seconds < 0){
             navigate('/Placar', {state:{times: dadosRecebido.time}})
          }
        }, 1000);
      } else if (!isActive && seconds !== 0) {
      
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds]); 
   
    const toggle = () => {
      setIsActive(!isActive);
    };
  
   
    const reset = () => {
      setSeconds(60);
      setIsActive(false);
    };
  
    
    const formatTime = () => {
      const getSeconds = `0${seconds % 60}`.slice(-2);
      const minutes = `${Math.floor(seconds / 60)}`;
      const getMinutes = `0${minutes % 60}`.slice(-2);
      
      return `${getMinutes}:${getSeconds}`;
    };
  

    const pontuar=()=>{
        console.log(typeof( dadosRecebido.time.pontos))
        dadosRecebido.time.pontos = dadosRecebido.time.pontos + dadosRecebido.nivel
        navigate('/Placar', {state:{times: dadosRecebido.time}})
    }
    return (
        <div>
            <h1 className={`${style.headr}`}>Time: {dadosRecebido.time.nome} - Pontos: {dadosRecebido.time.pontos}</h1>
           <section className={`${style.cardDesafio}`}>
              {dadosRecebido.nivel < 3 &&
                <> <p>Cante um hino com a palavra</p>
                  <h1>{dadosRecebido.desafio}</h1></>
              }
              {dadosRecebido.nivel > 2 &&
                <> <p>Responda a pergunta</p>
                  <h1>{dadosRecebido.desafio}</h1></>
              }
              <p>Valendo {dadosRecebido.nivel} pontos</p>
           </section>
           <section className={`${style.timer}`}>
                <p>{formatTime()}</p>
                <div>
                <button
                    onClick={()=>{
                        if(!isActive){
                            toggle()
                        }else{
                            reset()
                        }
                    }}
                >
                    {!isActive && <span>Começar</span>}
                    {isActive && <span>Reiniciar</span>}
                </button>
                <button 
                style={{backgroundColor:"yellow"}}
                onClick={
                    pontuar}
                >
                    Pontuar
                </button></div>
           </section>
        </div>
    )
}