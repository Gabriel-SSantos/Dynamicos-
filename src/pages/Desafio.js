import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import style from "../layout/styles/desafio.module.css"
 let desafios = JSON.parse(localStorage.getItem('DynamicosDesafios')) 

function retirarDesafio(desafioLista){
  const j = Math.floor(Math.random() * (desafioLista.length))
  let desafioAtual = desafioLista[j]
  let temp
  for(let i = j; i < desafioLista.length - 1; i++){
    temp = desafioLista[i]
    desafioLista[i] = desafioLista[i+1]
    desafioLista[i+1] = temp
  }
  desafioLista.pop()
  return desafioAtual
}

function GirarDado({time,index}){
    const navigate = useNavigate()
    const [valorExibido, setValorExibido] = useState('?')
    const [rolando, setRolando] = useState(false)
    const [dadoValor, setDadoValor] = useState(null)
    const [resultadoCategoria, setResultadoCategoria] = useState(null)
    const [desafiosLista,setDesafiosLista] = useState({})
    const Dado = ({rolando, valor})=>{
      

        useEffect(()=>{

            setDesafiosLista(desafios)
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
        
        setTimeout(()=>{
            let resultado = Math.floor(Math.random() * 6)

            setRolando(false)
            setDadoValor(resultado)
            setResultadoCategoria(resultado)

            setTimeout(()=>{
                let desafioAtual = retirarDesafio(desafiosLista[resultado].desafios)
                let pontos = desafiosLista[resultado].pontos
                console.log(desafioAtual)
                localStorage.setItem('DynamicosDesafios',JSON.stringify(desafiosLista))
                navigate('/Ponto', {state: {time: time, desafio: desafioAtual, nivel: pontos,index: index}})
            }, 1500) 
               
        },1500)
    }
   
    return(
        <div className={`${style.secDado}`}>
            <p style={{marginBottom: 10, fontSize: 18, fontWeight: "bold", textAlign: "center"}}>Gire para saber o tipo de desafio da partida</p>
           
            <div className={`${style.dado}`}>
                <p>
                    {valorExibido}
                </p>
            </div>
            <Dado rolando={rolando} valor={dadoValor}/>
            <button
                className={`${style.buton}`}
                onClick={
                    rodar
                }
            >
                <p>Girar</p>
            </button>
            
                <p style={{fontSize: 20,fontWeight: "bold", textAlign:"center"}}>
                    {resultadoCategoria != null &&
                    
                    <>{desafiosLista[resultadoCategoria].nome}
                    <br/>{desafiosLista[resultadoCategoria].pontos} pontos
                    
                    </>
                    
                    }
                </p>
               
        </div>
    )
}

export default function Desafio(){
    const location = useLocation()
    const dadosRecebido = location.state?.times
    const index = Number.parseInt(location.state?.index)
    console.log(index)
    return (
        <div >
            <h1 className={`${style.headr}`}>Time: {dadosRecebido[index].nome} - Pontos: {dadosRecebido[index].pontos}</h1>
            <section>
                <GirarDado index={index} time={dadosRecebido[index]}/>
            </section>
        </div>
    )
}