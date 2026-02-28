import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import style from "../layout/styles/placar.module.css"
import { FaTrophy } from "react-icons/fa";
class Player{
    constructor(x,y,l,a,color){
        this.x = x;
        this.y = y;
        this.l = l;
        this.a = a;
        this.color = color
    }
    desenhar(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.l,this.a)
    }
}
const largura = window.innerWidth
export default function Placar(){
    const location = useLocation()
    const navigate = useNavigate()
    const [placar, setPlacar] = useState(null)
    const dados = location.state?.times
    const index = location.state?.index
    const [vencedor,setVencedor]=useState(null)
    let times
    
    const canvasRef = useRef(null);
    useEffect(()=>{

        times = JSON.parse(localStorage.getItem('DynamicosTimes')) || []
        times[index].pontos = dados.pontos
        if(times[index].pontos >= 58){
            setVencedor(times[index].nome)
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
        let colors = ["red","blue","green","yelow","gray"]
        let jogadores = []
        for(let i = 0; i < times.length; i++){
            jogadores.push(new Player((canvas.height/2 - 100) + (i*60),500 - times[i].pontos * 6.9,50,times[i].pontos * 6.9,colors[i]))
        }

        let animationId;
        const render = ()=>{
            ctx.fillStyle = "#ffffff"; // Cinza claro
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#53535369"
            ctx.fillRect(0, 0, canvas.width, 40);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 20px sans-serif";
            ctx.fillText(`CHEGADA`, canvas.height/2 - 100, 30);
            


            for(let i = 0; i < jogadores.length; i++){
                jogadores[i].desenhar(ctx)
            }

            animationId = requestAnimationFrame(render)
        }
        render()
        setPlacar(times)

        return () => cancelAnimationFrame(animationId)
        
    },[])

   const salvar = ()=>{
        localStorage.setItem('DynamicosTimes',JSON.stringify(placar))
        let idx = (index + 1) % placar.length
        navigate("/Desafio", {state:{times:placar,index:idx}})
    }

    

    return (
        <div>
            <h1 className={`${style.headr}`}>Placar</h1>
          <div className={`${style.container}`}>
            <section>
            {placar &&
                placar.map((time,index)=>(
                    <div className={`${style.card}`}>
                        <p>Time {time.nome}</p>
                        <p>Pontos: {time.pontos}</p>
                        
                    </div>
                ))
                
            }
            </section> 
                <canvas
                ref={canvasRef}
                width={400}
                height={500}
                style={{width:"90%",height:"100%", marginBottom:"10px",borderRadius:"15px",border:"2px solid"}}
            >
               
            </canvas>
            {vencedor && 
            <div className={`${style.vencedor}`}>
                <div>
                    <FaTrophy size={100}
                    color="rgba(255, 170, 10)"
                    />
                    <p className={`${style.parabens}`}>PARABÉNS</p>
                    <p>Time: {vencedor}</p>
                </div>
                <button 
                    onClick={()=>navigate('/')}
                >
                    Voltar
                </button>
            </div>}
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