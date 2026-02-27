import LinkButton from "../layout/LinkButton"
export default function Start(){
    
    return (
        <div>
            Olá, mundo
            <LinkButton
                to={"/Times"}
            >
                <p>JOGAR</p>
            </LinkButton>
        </div>
    )
}