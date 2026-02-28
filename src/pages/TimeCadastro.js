import { useState, useEffect } from "react"
import style from '../layout/styles/times.module.css'

export const BotaoCadastro=({cadastramento})=>{
    return(
        <div 
            onClick={cadastramento}
            className={`${style.botao}`}>
            <p>Adicionar Time</p>
        </div>
    )
}
 const salvar=({nome,i})=>{
        const jogadores = JSON.parse(localStorage.getItem('DynamicosTimes')) || []
        if(i != null){
            console.log(i)
            jogadores[i].nome = nome
        }else jogadores.push({nome:nome,pontos:0})
        localStorage.setItem('DynamicosTimes',JSON.stringify(jogadores))
}


export default function TiemCadastro({cadastramento}){

    const [nome,setNome] = useState("")
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }

    return (
        <div className={`${style.cad_box}`}>
            <span onClick={cadastramento}>X</span>
            <div>
                <input 
                    type='text'
                    placeholder="Nome do time"
                    value={nome}
                    onChange={mudancaEstadoNome}/>
            </div>
            <button type='button'
                onClick={()=>{
                cadastramento()
                salvar({nome:nome})}}
                >Salvar</button>
        </div>
    )
}

export function TimeEdit({editavel,i}){

    const [nome,setNome] = useState("")
    
    useEffect(()=>{
        let times = JSON.parse(localStorage.getItem('DynamicosTimes')) || []
        setNome(times[i].nome)
    },[])

    console.log("Nome: ",nome)
    const mudancaEstadoNome = (e)=>{
        setNome(e.target.value)
    }

    console.log(`Nome:${nome}`)

    return(
    <div className={`${style.cad_box}`}>
        <span onClick={editavel}>X</span>
        <div><p style={{fontSize:"15px",textAlign:"center"}}>Faça a edição necessária</p></div>
        
        <div><input 
            type='text'
            value={nome}
            onChange={mudancaEstadoNome}
            /></div>
        
        <button type='button'
            onClick={()=>{  
                editavel()
                salvar({nome:nome,i})
            }}
        >Salvar</button>
       
    </div>
    )

}