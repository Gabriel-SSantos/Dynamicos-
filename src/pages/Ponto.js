import { useLocation, useNavigate } from "react-router-dom"
import {useState, useEffect } from "react";
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
           <h2>Time: {dadosRecebido.time.nome}</h2>
           <h2>Pontos: {dadosRecebido.time.pontos}</h2>
           <section>
            {dadosRecebido.nivel < 3 &&
               <> <p>Cante um hino com a palavra</p>
                <h1>{dadosRecebido.desafio}</h1></>
            }
           </section>
           <section>
                <h3>{formatTime()}</h3>
                <button
                    onClick={()=>{
                        if(!isActive){
                            toggle()
                        }else{
                            reset()
                        }
                    }}
                >
                    Começar
                </button>
                <button onClick={
                    pontuar}
                >
                    Pontuar
                </button>
           </section>
        </div>
    )
}