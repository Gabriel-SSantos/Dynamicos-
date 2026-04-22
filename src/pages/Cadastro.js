import { useState, useEffect } from "react"

import style from '../layout/styles/perguntas.module.css'

export const salvar = ({nivel,desafio})=>{
        let desafiosLista = JSON.parse(localStorage.getItem('DynamicosDesafios')) || []
        console.log(desafiosLista)
        if(desafiosLista.length < 1){
             desafiosLista = [
                {nome:"Nível 1",
                    pontos:1,
                    desafios:[]
                },
                {nome:"Nível 2",
                    pontos:2,
                    desafios:[]
                },{nome:"Nível 3",
                    pontos:3,
                    desafios:[]
                },{nome:"Nível 4",
                    pontos:4,
                    desafios:[]
                },{nome:"Nível 5",
                    pontos:5,
                    desafios:[]
                },{nome:"Nível 6",
                    pontos:6,
                    desafios:[]
                },
            ] 
        }
        desafiosLista[nivel].desafios.push(desafio)
        localStorage.setItem('DynamicosDesafios',JSON.stringify(desafiosLista))
    }


export const BotaoCadastro=({cadastramento})=>{
    return(
        <div 
            onClick={cadastramento}
            className={`${style.botao}`}>
            <p>Adicionar Desafio</p>
        </div>
    )
}
function Selection({text,name,options,handleOnChange,value}){
    return(
        <div>
            <label>{text}  </label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value}
            >
                <options value={"Defina o nível"}>Selecione uma opção</options>
                
                {
                    options.map((option)=>(
                        <option value={option.id} key={option.id}> 
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}


export function DesafioEdit({editavel,i,nivelP}){

    const [desafio,setDesafio] = useState("")
    const [nivel,setNivel] = useState(nivelP)
    useEffect(()=>{
        let desafiosLista = JSON.parse(localStorage.getItem('DynamicosDesafios')) || []
        setDesafio(desafiosLista[nivel].desafios[i])
    },[])

    console.log("desafio: ",desafio)
    const mudancaEstadoDesafio = (e)=>{
        setDesafio(e.target.value)
    }
    const mudancaEstadoNivel = (e)=>{
        setNivel(e.target.value)
    }

    return(
    <div className={`${style.cad_box}`}>
        <span onClick={editavel}>X</span>
        <div><p style={{fontSize:"15px",textAlign:"center"}}>Faça a edição necessária</p></div>
        
        <div><input 
            type='text'
            value={desafio}
            onChange={mudancaEstadoDesafio}
            /></div>
         {
                Selection(
                    {
                        name:"nivel",
                        text:"Nível",handleOnChange:mudancaEstadoNivel,
                        options:[0,1,2,3,4,5,6],
                        value:nivel
                    })
            }
        <button type='button'
            onClick={()=>{  
                editavel()
                salvar({desafio:desafio,nivel:nivel})
            }}
        >Salvar</button>
       
    </div>
    )

}

export default function Cadastro({cadastramento}){

    

    const [desafio,setDesafio] = useState()
    const [nivel,setNivel] = useState(0)

   
    const mudancaEstadoNivel = (e)=>{
        setNivel(Number.parseInt(e.target.value))
    }
    const mudancaEstadoDesafio = (e)=>{
        setDesafio(e.target.value)
    }

    return(
        <div>
            <div>
                <input 
                    type='text'
                    placeholder="Colocar desafio"
                    value={desafio}
                    onChange={mudancaEstadoDesafio}/>
            </div>
             <div>
            {
                Selection(
                    {
                        name:"nivel",
                        text:"Nível",handleOnChange:mudancaEstadoNivel,
                        options:[0,1,2,3,4,5,6],
                        value:nivel
                    })
            }
            </div>
            <button type='button'
                onClick={()=>{
                cadastramento()
                salvar({desafio:desafio,nivel:nivel})}}>Salvar</button>
        </div>
    )
}