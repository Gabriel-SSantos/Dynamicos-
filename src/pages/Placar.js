import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Placar(){
    const location = useLocation()
    const navigate = useNavigate()
    const [placar, setPlacar] = useState(null)
    const dados = location.state?.times
    const proxTime=(times)=>{
        const TAM = times.length
        let temp = ""
        for(let i = 0;i < TAM - 1;i++){
            temp = times[i]
            times[i] = times[i+1]
            times[i+1] = temp
        }
        return times
    }

    const salvar = ()=>{
        let times = proxTime(placar)
        localStorage.setItem('DynamicosTimes',JSON.stringify(times))
        navigate("/Desafio", {state:{times:placar}})}
    
    useEffect(()=>{
        let times = JSON.parse(localStorage.getItem('DynamicosTimes')) || []
        times[0].pontos = dados.pontos
        setPlacar(times)
        console.log(times)
    },[])


    return (
        <div>
            Placar: 
            {/* {console.log(placar)} */}
            {placar &&
                placar.map((time,index)=>(
                    <>
                        <p>Time {time.nome}</p>
                        <p>Pontos: {time.pontos}</p>
                        
                    </>
                ))
                
            }
            <button
                onClick={
                    salvar
                }>
                Próximo
            </button>
        </div>
    )
}