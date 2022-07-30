import React, {useState, useEffect} from "react";
import Die from "./Components/Die";
import {nanoid} from "nanoid"

function App() {
  const [diceArray, setDiceArray] = useState([])
  const [tenzies, setTenzies] = useState(false) 
  
  function generateNewDie(){
    return{value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()}
  }

  function allNewDice(){
    let nums = []
    for (let i = 0; i < 10; i++) {
        nums.push(generateNewDie())
    }
    setDiceArray(nums)
  }

  function rollNew(){
    if (!tenzies) {
      setDiceArray(prevDiceArray => prevDiceArray.map((item)=> {return item.isHeld ? item : generateNewDie()}))
    }else{
      setTenzies(false)
      allNewDice()
    }
    
  }
  
  function holdDice(id){
    setDiceArray(prevDiceArray => prevDiceArray.map((item)=> {return id===item.id ? {...item, isHeld: !item.isHeld} : item}))
  }

  function isOver(){
    if (diceArray.length>0) {
      const allHeld = diceArray.every(item => item.isHeld)
    const firstValue = diceArray[0].value
    const allEqual = diceArray.every(item => firstValue === item.value)

    if (allHeld && allEqual) {
      setTenzies(true)
    }
    }
  }

  useEffect(allNewDice,[])
  useEffect(isOver,[diceArray])

  return (
    <main>
      <div className="title"><h1>My Tenzies App</h1>
      <p>Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p></div>
       <div className="App">
        {diceArray.map((item)=> <Die value={item.value} isHeld={item.isHeld} key={item.id} holdDice={()=> holdDice(item.id)} />)}
    </div>
    <button onClick={rollNew}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
    
   
  );
}

export default App;
