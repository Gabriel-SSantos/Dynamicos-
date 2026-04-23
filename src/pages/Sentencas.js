import { useState } from "react"
import style from "../layout/styles/Sentencas.module.css"

function retirarDesafio(desafioLista){
  const j = Math.floor(Math.random() * (desafioLista.length))
  let desafioAtual = desafioLista[j]
  return desafioAtual
}

export default function Sentencas(){
    const sentencasLista = ['Medo', 'Ansiedade', 'Frieza Espiritual','Desânimo','Culpa','Vício']
    let sentenca = retirarDesafio(sentencasLista)
    const [revelado,setRevelado] = useState(false)
    return(
        <div className={`${style.container}`}>
            {revelado ? ( 
                <section className={`${style.cardDesafio}`}>
                
                <h1>{sentenca}</h1>
                </section>
                ):(
                <section className={`${style.palavraOculta}`} onClick={()=>{setRevelado(true)}}>
                    <h1>?</h1>
                </section>
                )
            }
           
           
           
        </div>
    )
}