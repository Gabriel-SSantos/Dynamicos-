import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Desafios from "../data/dados.json"

function retirarDesafio(desafioLista){
  const j = Math.floor(Math.random() * (desafioLista.length))
  return desafioLista[j]
}

function GirarDado({time}){
    const navigate = useNavigate()
    const [valorExibido, setValorExibido] = useState('?')
    const [rolando, setRolando] = useState(false)
    const [dadoValor, setDadoValor] = useState(null)
    const [resultadoCategoria, setResultadoCategoria] = useState(null)
    const Dado = ({rolando, valor})=>{
        
        useEffect(()=>{
            if(rolando){
                const intervalo = setInterval(()=>{
                    const numeroAleatorio = Math.floor(Math.random() * 6)
                    setValorExibido(numeroAleatorio.toString())
                },100)
                return ()=> clearInterval(intervalo)
            } else {
                setValorExibido(valor != null ? (valor + 1).toString() :'?')
                
            }
        },[rolando,valor])
    }

    
    const rodar = ()=>{
        if(rolando) return

        setRolando(true)
        setDadoValor(null)
        console.log(Desafios.Desafios)
        
        setTimeout(()=>{
            let resultado = Math.floor(Math.random() * 6)

            setRolando(false)
            setDadoValor(resultado)
            setResultadoCategoria(resultado)

            setTimeout(()=>{
                let desafioAtual = retirarDesafio(Desafios.Desafios[resultado].desafios)
                let pontos = Desafios.Desafios[resultado].pontos
                console.log(desafioAtual)
                navigate('/Ponto', {state: {time: time, desafio: desafioAtual, nivel: pontos}})
            }, 1500) 
               
        },1500)
    }
   
    return(
        <div
            
        >
            <p style={{marginBottom: 10, fontSize: 18, fontWeight: "bold", textAlign: "center"}}>Gire para saber o tipo de desafio da partida</p>
            <div>
                <p>
                    {valorExibido}
                </p>
            </div>
            <Dado rolando={rolando} valor={dadoValor}/>
            <button
                
                onClick={
                    rodar
                }
            >
                <p>Girar</p>
            </button>
            
                <p style={{fontSize: 20}}>
                    {resultadoCategoria != null &&
                    
                    <>Categoria: {Desafios.Desafios[resultadoCategoria].nome}
                    <br/>Pontos:
                    {Desafios.Desafios[resultadoCategoria].pontos}
                    
                    </>
                    
                    }
                </p>
               
        </div>
    )
}

export default function Desafio(){
    const location = useLocation()
    const dadosRecebido = location.state?.times
    const [desafios,setDesafios] = useState()
    
    return (
        <div>
            <h1>Time: {dadosRecebido[0].nome} Pontos: {dadosRecebido[0].pontos}</h1>
            <section>
                <GirarDado time={dadosRecebido[0]}/>
            </section>
        </div>
    )
}