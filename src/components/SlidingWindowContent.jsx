import React from 'react'
import Letter from "./Letter.jsx"
import slidingWindow from "../slidingWindow.js"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';



export default function SlidingWindowContent() {

  // Creation of the array of letters, it will split each
  // element of the string as a single array item and it 
  // will be converted to string

  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  // We define the string that will initialize the state of the text

  var auxLetters = []

  for (let i=0 ; i<110 ; i++){
    var randomIndex = Math.floor(Math.random()*letters.length)
    var randomLetterValue = letters[randomIndex]
    var randomLetter = {
      value : randomLetterValue,
      index : i,
      color : "black"
    }
    auxLetters.push(randomLetter)
  }

  var [string,setString] = React.useState(auxLetters)

  // The function that will restart the string 

  function restartString(){
    auxLetters = []
    for (let i=0 ; i<110 ; i++){
      var randomIndex = Math.floor(Math.random()*letters.length)
      var randomLetterValue = letters[randomIndex]
      var randomLetter = {
        value : randomLetterValue,
        index : i,
        color : "black"
      }
      auxLetters.push(randomLetter)
    }
    setString(auxLetters)
  }

  // The state that will keep track of the introduced string 

  var [inputString,setInputString] = React.useState("")
//console.log(string)
  // We will map the letters of the string , show a restart button 
  // and show an input form that will run the sliding window algo when pressed

  return (<div>
    <div className='string'>
      {string.map((letter,index) => {
        return <Letter value={letter.value} color={letter.color} key={index} />
      })}
    </div>
    <div className="restart">
      <Button size="small" onClick={restartString}  >Restart</Button>
    </div>
    <div className='search'>
      <form onSubmit={(event)=> { 
      event.preventDefault();
      slidingWindow(string,setString,inputString);
      setInputString("")}}>
        <TextField size="small"
          type="text" 
          value={inputString}
          onChange={(event)=> setInputString(event.target.value)} 
          placeholder='Search substring'
          autoComplete="off">
        </TextField>
        <Button type="submit">
          <SearchIcon size="small" />
        </Button>
      </form>
    </div>
  </div>
  )
}
