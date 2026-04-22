import { useEffect, useState } from 'react'
import style from '../layout/styles/times.module.css'

import TimeCadastro from './TimeCadastro';
import { BotaoCadastro } from '../pages/TimeCadastro';

import { TimeEdit } from './TimeCadastro';
import LinkButton from '../layout/LinkButton';

import Cadastro from './Cadastro';

import { BiPencil } from 'react-icons/bi';
import { BiTrash } from 'react-icons/bi';
export default function Times(){

    const Ficha = ({nome, pontos,id,edit,apagar})=>{
   
        return(
        <div className={`${style.card}`}>
            <div className={`${style.cardText}`}>
                <p>Nome: {nome}</p>
                <p>Pontos {pontos}</p>
            </div>
            <div className={`${style.cardActions}`}>
                <BiPencil size={32}
                style={{marginRight:"5px"}}
                onClick={()=>edit(id)}/>
                <BiTrash size={32}
                onClick={()=>apagar(id)}
                />
            </div>
        </div>
    )
    }

    const [times,setTimes] = useState()
    const [start,setStart] = useState(false)
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
        times.map((intem,index)=>{
            if (index != i){
                NovoVetor.push(intem)
            }
        })
        localStorage.setItem('DynamicosTimes',JSON.stringify(NovoVetor))
        setTimes(NovoVetor)
        if(NovoVetor.length > 1){
            setStart(true)
        } else setStart(false)
    }

    useEffect(()=>{
        const Lista = JSON.parse(localStorage.getItem('DynamicosTimes'))
        if(Lista && Lista.length > 1){
            setStart(true)
        } else setStart(false)
        setTimes(Lista)
    },[cadastrar,editavel])

    return(
        <section className={`${style.container}`}>
            {times? <p>Aqui estão seus cadastros</p>:<p>Nenhum cadastro encontrado, adicione seus jogadores</p>}
            <BotaoCadastro 
                cadastramento={ativarCadastramento}/>
            {editavel && <TimeEdit i={editIndex} editavel={desativarEdicao}/>}
            {cadastrar && <TimeCadastro
            cadastramento={desativarCadastramento}/>}
            {times && 
                times.map((time,index)=>
                    (<Ficha 
                        key={index}
                        id = {index}
                        nome={time.nome}
                        pontos={time.pontos}
                        edit={indiceEdit}
                        apagar={Apagar}
                        />))}
            
            <div className={`${style.buton}`}
            >
            <Cadastro/>
                {start &&
                    <LinkButton to={"/Desafio"} text={"Começar Jogo"} state={{times:times,index:0}}/>
                }
                {}
            </div>
        </section>
    )
}

