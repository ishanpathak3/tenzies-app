import React from "react";
import { nanoid } from "nanoid"
import Die from "./components/Die";
import Confetti from "react-confetti";



function App() {
  const [dieData, setDieData] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)



  React.useEffect(() => {
    // checks if every value are same and all boxes held 
    const allheld = dieData.every(item => item.isHeld)
    const allSame = dieData.every(die => die.value === dieData[0].value)
    if (allheld && allSame) {
      setTenzies(true)
    }
  }, [dieData])


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function rollDice() {
    if(!tenzies){
      setDieData(prevState => prevState.map(item => {
        return item.isHeld ?
          item :
          generateNewDie()
      }))
    }else{
      setTenzies(false)
      setDieData(allNewDice())
    }
  }


  function holdDice(id) {
    setDieData(prevState => {
      return prevState.map(item => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item
      })
    })
  }

  function allNewDice() {
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }




  const dieElement = dieData.map(die =>
    <Die
      holdDice={holdDice}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id} />
  )


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dieElement}
      </div>

      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
