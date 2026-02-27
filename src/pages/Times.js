import { useEffect, useState } from 'react'
import style from '../components/pages/Cadastro/cadastros.module.css'

import TimeCadastro from './TimeCadastro';
import { BotaoCadastro } from '../components/pages/Cadastro/AddCadastro';

import { TimeEdit } from './TimeCadastro';
import EditCadastro from '../components/pages/Cadastro/EditCadastro';

export default function Times(){

    const Ficha = ({nome, pontos,id,edit,apagar})=>{
    return(
        <div className={`${style.card}`}>
               
                <div>
                    <p>Nome: {nome}</p>
                    <p>Pontos {pontos}</p>
                </div>
            <div>
                <p
                style={{marginRight:"5px"}}
                onClick={()=>edit(id)}>EDITAR</p>
                <p
                onClick={()=>apagar(id)}
                >APAGAR</p>
            </div>
        </div>
    )
    }

    const [cadastros,setCadastros] = useState()
    const [cadastrar,setCadastrar] = useState(false)
    const [editavel,setEditavel] = useState(false)
    const [editIndex,setEditIndex] = useState(-1)
    const ativarCadastramento = ()=>{
        setCadastrar(true)
    }
    const desativarCadastramento = ()=>{
        setCadastrar(false)
    }
    
    const desativarEdicao = ()=>{
        setEditavel(false)
    }
    const indiceEdit=(i)=>{
        setEditIndex(i)
        setEditavel(true)
    }

    const Apagar = (i)=>{
        let NovoVetor = []
        cadastros.map((intem,index)=>{
            if (index != i){
                NovoVetor.push(intem)
            }
        })
        localStorage.setItem('DynamicosTimes',JSON.stringify(NovoVetor))
        setCadastros(NovoVetor)
    }

    useEffect(()=>{
        const Lista = JSON.parse(localStorage.getItem('DynamicosTimes'))
        setCadastros(Lista)
    },[cadastrar,editavel])

    return(
        <section className={`${style.cad_container}`}>
            {cadastros? <p>Aqui estão seus cadastros</p>:<p>Nenhum cadastro encontrado, adicione seus jogadores</p>}
            <BotaoCadastro 
                cadastramento={ativarCadastramento}/>
            {editavel && <TimeEdit i={editIndex} editavel={desativarEdicao}/>}
            {cadastrar && <TimeCadastro
            cadastramento={desativarCadastramento}/>}
            {cadastros && 
                cadastros.map((time,index)=>
                    (<Ficha 
                        key={index}
                        id = {index}
                        nome={time.nome}
                        pontos={time.pontos}
                        edit={indiceEdit}
                        apagar={Apagar}
                        />))}
            <div
                style={{
                    marginBottom: "80px",
                }}
            >
                {}
            </div>
        </section>
    )
}

