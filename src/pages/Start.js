import LinkButton from "../layout/LinkButton"
import style from '../layout/styles/start.module.css'
export default function Start(){
    
    return (
        <main 
        className={`${style.container}`}>
            <h1>Dynamic'ools</h1>
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