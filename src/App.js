
import './App.css';

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/Game';

//React

import {useState, useCallback, useEffect} from 'react'

import { wordList } from './data/word';


const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "fim" },
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)


  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setPickLetters] = useState([])




  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)
  

  const [words] = useState(wordList)


  const pickWordAndCategory = () => {
    //pick random category
    const categories = Object.keys(words)

    // pick one category
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)

    
    
    //pick a random word

    const word = words[category][Math.floor(Math.random() * words[category].length)]


    
    return {word, category}
    
  }
 

  const startGame = () => {

    // pegar categoria e palavra
   const {word, category} =  pickWordAndCategory()
   console.log(word, category)
   

   // pick letter. Create an Array of Letter
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())
    console.log(wordLetters)


    // fill States
    setPickedWord(word)
    setPickedCategory(category)
    setPickLetters(wordLetters)

    setGuesses(5)

    setGameStage(stages[1].name)
  }


  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }

    
    
  }

  console.log(guessedLetters)
    console.log(wrongLetters)



  const cleanStates = () => {

    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
  if(guesses <= 0){
      setGameStage(stages[0].name)

      // clear letter states
    cleanStates()
    }

  }, [guesses])


  

  return (
    <div className="App">

      

      {gameStage === "start" && <StartScreen startGame={startGame} /> }


      {gameStage === "game" && <Game verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory}
      letters={letters}
      guesses={guesses}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      score={score}
      
      />}


    
     
    </div>
  );
}

export default App;
