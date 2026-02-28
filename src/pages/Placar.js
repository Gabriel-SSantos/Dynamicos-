import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import style from "../layout/styles/placar.module.css"
export default function Placar(){
    const location = useLocation()
    const navigate = useNavigate()
    const [placar, setPlacar] = useState(null)
    const dados = location.state?.times
    const proxTime=(times)=>{
        const TAM = times.length
        let temp = ""
        for(let i = 0;i < TAM - 1;i++){
            temp = times[i]
            times[i] = times[i+1]
            times[i+1] = temp
        }
        return times
    }

    const salvar = ()=>{
        let times = proxTime(placar)
        localStorage.setItem('DynamicosTimes',JSON.stringify(times))
        navigate("/Desafio", {state:{times:placar}})
    }
    const canvasRef = useRef(null);
    useEffect(()=>{

        let times = JSON.parse(localStorage.getItem('DynamicosTimes')) || []
        times[0].pontos = dados.pontos
        if(times[0].pontos >= 58){
            alert("Vencedor time: " + times[0].nome)
        }


        const canvas = canvasRef.current;
        if (!canvas || typeof canvas.getContext !== 'function') {
        console.warn("Aguardando inicialização do elemento canvas...");
        return;
        }
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
           alert("Erro: Contexto 2D não suportado.");
            return;
        }

        let player = {
            x: 150,
            y: 200,
            l: 15,
            a: 15,
            color: "red",

            desenhar(context){
                ctx.fillStyle = this.color
                ctx.fillRect(this.x,this.y,this.l,this.a)
            }
        }
      
        let animationId;
        const render = ()=>{

            ctx.fillStyle = "#ffffff"; // Cinza claro
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            player.desenhar(ctx)   

            animationId = requestAnimationFrame(render)
        }
        render()
        return () => cancelAnimationFrame(animationId)
        setPlacar(times)
        console.log(times)
    },[])

   

    return (
        <div>
            <h1 className={`${style.headr}`}>Placar</h1>
          <div className={`${style.container}`}>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{width:"100%",height:"100%", marginBottom:"10px"}}
            ></canvas>
            {/* <section>
            {placar &&
                placar.map((time,index)=>(
                    <div className={`${style.card}`}>
                        <p>Time {time.nome}</p>
                        <p>Pontos: {time.pontos}</p>
                        
                    </div>
                ))
                
            }
            </section> */}
            <button
             className={`${style.buton}`}
                onClick={
                    salvar
                }>
                Próximo
            </button>
            </div>
        </div>
    )
}