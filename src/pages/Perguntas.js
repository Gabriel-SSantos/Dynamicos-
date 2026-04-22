
import { useEffect, useState } from 'react'
import style from '../layout/styles/perguntas.module.css'
import LinkButton from '../layout/LinkButton';

import Cadastro from './Cadastro';
import { BotaoCadastro } from './TimeCadastro';
import { DesafioEdit } from './Cadastro';
import { BiPencil } from 'react-icons/bi';
import { BiTrash } from 'react-icons/bi';



export default function Perguntas(){

    const [desafios,setDesafios] = useState()
    const [start,setStart] = useState(false)
    const [cadastrar,setCadastrar] = useState(false)
    const [editavel,setEditavel] = useState(false)
    const [editIndex,setEditIndex] = useState(-1)
    const [nEdit,setNEdit] = useState(-1)
    
    useEffect(()=>{
        const Lista = JSON.parse(localStorage.getItem('DynamicosDesafios'))
        if(Lista && Lista.length > 1){
            setStart(true)
        } else setStart(false)
        setDesafios(Lista)
    },[cadastrar,editavel])


    const ativarCadastramento = ()=>{
        setCadastrar(true)
    }
    const desativarCadastramento = ()=>{
        setCadastrar(false)
    }
    
    const desativarEdicao = ()=>{
        setEditavel(false)
    }
    const nivelEdit=(n)=>{
        setNEdit(n)
    }
    const indiceEdit=(i)=>{
        setEditIndex(i)
        setEditavel(true)
    }

    const Faixa = ({desafios, pontos,edit,apagar,nEdit})=>{
        return(
        <div>
            <div className={`${style.cardText}`}>
                <p>Nível {pontos}</p>
            </div>
            {desafios.map((ds, id)=>
                <div className={`${style.card}`}>
                    <div className={`${style.cardText}`}>
                    <p>{ds}</p>
                </div>
                <div className={`${style.cardActions}`}>
                    <BiPencil size={32}
                    style={{marginRight:"5px"}}
                    onClick={()=>{
                        nEdit(pontos - 1)
                        edit(id)
                    }
                    }/>
                    <BiTrash size={32}
                    onClick={()=>apagar(id,pontos-1)}
                    />
                </div>
                </div>
             )
            }
           
        </div>
        )
    }
    
     const Apagar = (i,nivel)=>{
        let listaAntiga =  desafios
        let tam = listaAntiga[nivel].desafios.length
        listaAntiga[nivel].desafios[i] = listaAntiga[nivel].desafios[tam-1]
        listaAntiga[nivel].desafios.pop()
        localStorage.setItem('DynamicosDesafios',JSON.stringify(listaAntiga))
        setDesafios(listaAntiga)
        if(listaAntiga.length > 1){
            setStart(true)
        } else setStart(false)
    }


    return (
        <section className={`${style.container}`}>
            {desafios? <p>Aqui estão seus cadastros</p>:<p>Nenhum cadastro encontrado, adicione seus jogadores</p>}
            <BotaoCadastro 
                cadastramento={ativarCadastramento}/>
            {editavel && <DesafioEdit i={editIndex} editavel={desativarEdicao} nivelP={nEdit}/>}
            {cadastrar && <DesafioEdit
            cadastramento={desativarCadastramento}/>}
            {desafios && 
                desafios.map((time,index)=>
                    (<Faixa 
                        key={index}
                        id = {index}
                        desafios={time.desafios}
                        pontos={time.pontos}
                        nEdit={nivelEdit}
                        edit={indiceEdit}
                        apagar={Apagar}
                        />))
            }
            
            <div className={`${style.buton}`}
            >
            <Cadastro cadastramento={desativarCadastramento}/>
                {start &&
                    <LinkButton to={"/"} text={"Voltar"} />
                }
                {}
            </div>
        </section>
    )
}