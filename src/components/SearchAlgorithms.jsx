import React from 'react'
import binarySearch from "../binarySearch.js"
import linearSearch from "../linearSearch.js"
import Column from "./Column.jsx"

export default function SearchAlgorithms() {

  // First we'll generate an auxiliar  array of random 
  // data for linear Search , so we it doesnt need to be sorted
  
  var auxLinearColumns = []

  for (let i=0; i<150 ; i++){
    var randomNumber = Math.floor(Math.random()*151)
    auxLinearColumns.push({value : randomNumber, color : "lightblue",index : i})
  }

  // We define a state with the array created because we will
  // need to keep track of the changes when we run linear search
  
  var [linearColumns,setLinearColumns] = React.useState(auxLinearColumns)

  // We repeat the process for binary search knowing that in this case
  // the columns must be sorted 

  var auxBinaryColumns = []

  for (let i=0; i<150 ; i++){
    auxBinaryColumns.push({value : i, color : "lightblue",index : i})
  }

  var [binaryColumns,setBinaryColumns] = React.useState(auxBinaryColumns)

  // And we'll use a state to difference between binary and search

  var [sortingAlgo,setSortingAlgo] = React.useState(false)

  // And the state of the number to search

  var [numberToSearch,setNumberToSearch] = React.useState("")

  function runSearchingAlgo(event){
    event.preventDefault();
    if (sortingAlgo){
      binarySearch(numberToSearch,binaryColumns,setBinaryColumns)
    }else if(!sortingAlgo){
      linearSearch(numberToSearch,linearColumns,setLinearColumns)
    }
  }

  // And we'll setup a restart button just for the linear search

  function restartLinearColumns(){
    auxLinearColumns = []

  for (let i=0; i<150 ; i++){
    var randomNumber = Math.floor(Math.random()*151)
    auxLinearColumns.push({value : randomNumber, color : "lightBlue",index : i})
  }
  setLinearColumns(auxLinearColumns)

  }

  return (<div>
      <div className='algorithmsList'>
        <button onClick={()=> setSortingAlgo(false)} name="linearSearch" className='algoButton'>Linear search </button>
        <button onClick={()=> setSortingAlgo(true)} name="binarySearch" className='algoButton'>Binary search</button>
      </div>
      <div className='algoContent'>
        {sortingAlgo ? 
        binaryColumns.map( (column,index) => {
          return <Column key={index} column={column.value} color={column.color}/>
          })
        : 
        linearColumns.map( (column,index) => {
          return <Column key={index} column={column.value} color={column.color}/>
        })}
      </div>
      <div className='search'>
        <form onSubmit={runSearchingAlgo}>
          <input type="text" onChange={(event)=>{setNumberToSearch(event.target.value)}} value={numberToSearch} placeholder='Search number (0-150)' ></input>
          <input type="submit"></input>
        </form>
      </div>
      <div className='restart'>
        <button onClick={restartLinearColumns}>Restart</button>
      </div>
    </div>
  )
}