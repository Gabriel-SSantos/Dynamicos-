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
        <div><spam style={{display:"flex"}} onClick={cadastramento}>X</spam><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para fazer o cadastro</p></div>
        
        <div><p>Nome: </p><input 
            type='text'
            value={nome}
            onChange={mudancaEstadoNome}
            /></div>
        
        <button type='button'
            className={`${style.button}`}
            
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
        <div style={{width:"100%",display:"flex",justifyContent:"flex-start"}}><p style={{fontSize:"15px",textAlign:"center"}}>Preencha o formulário para fazer o cadastro</p><p onClick={editavel}>X</p></div>
        
        <div><p>Nome: </p><input 
            type='text'
            value={nome}
            onChange={mudancaEstadoNome}
            /></div>
        
        <button type='button'
            className={`${style.button}`}
            
            onClick={()=>{
                
                editavel()
                salvar({nome:nome,i})
            }}
        >Salvar</button>
       
    </div>
    )

}