
import "./StartScreen.css"

const StartScreen = ({startGame}) => {

    return(

        <div className="start">
            <h2>Advinhe a Palavra</h2>

            <p>Clique no botão abaixo para começar a jogar</p>

            <button onClick={startGame}>Começar Jogo</button>
        </div>

    )

}

export default StartScreen