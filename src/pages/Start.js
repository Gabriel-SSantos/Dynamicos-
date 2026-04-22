import LinkButton from "../layout/LinkButton"
import style from '../layout/styles/start.module.css'
import Desafios from "../data/dados.json"
import { useEffect } from "react"

export default function Start(){
    

    return (
        <main 
        className={`${style.container}`}>
            <h1>Dynamic</h1>
            <div>
                {/* <LinkButton
                    to={"/Times"}
                    text={"JOGAR"}>
                </LinkButton>
                <LinkButton
                    to={"/Perguntas"}
                    text={"ADICIONAR PERGUNTAS"}>
                </LinkButton> */}
                <LinkButton
                    to={"/Sentencas"}
                    text={"Caixa de Palavras"}>
                </LinkButton>
            
            </div>
        </main>
    )
}