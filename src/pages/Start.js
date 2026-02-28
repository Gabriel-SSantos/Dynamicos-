import LinkButton from "../layout/LinkButton"
import style from '../layout/styles/start.module.css'
import Desafios from "../data/dados.json"
import { useEffect } from "react"
export default function Start(){
    
    useEffect(()=>{
        let desafios = JSON.parse(localStorage.getItem('DynamicosDesafios')) || []
        desafios = Desafios.Desafios
        localStorage.setItem('DynamicosDesafios',JSON.stringify(desafios))
    },[])
    return (
        <main 
        className={`${style.container}`}>
            <h1>Dynamic</h1>
            <div>
                <LinkButton
                to={"/Times"}
                 text={"JOGAR"}
                >
            </LinkButton>
            </div>
        </main>
    )
}