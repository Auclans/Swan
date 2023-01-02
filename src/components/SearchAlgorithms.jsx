import React from 'react'
import binarySearch from "../binarySearch.js"
import linearSearch from "../linearSearch.js"
import Column from "./Column.jsx"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchAlgorithms() {

  // First we'll generate an auxiliar  array of random 
  // data for linear Search , so we it doesnt need to be sorted
  
  var auxLinearColumns = []

  for (let i=0; i<150 ; i++){
    var randomNumber = Math.floor(Math.random()*151)
    auxLinearColumns.push({value : randomNumber, color : "#A6F1F5",index : i})
  }

  // We define a state with the array created because we will
  // need to keep track of the changes when we run linear search
  
  var [linearColumns,setLinearColumns] = React.useState(auxLinearColumns)

  // We repeat the process for binary search knowing that in this case
  // the columns must be sorted 

  var auxBinaryColumns = []

  for (let i=0; i<150 ; i++){
    auxBinaryColumns.push({value : i, color : "#A6F1F5",index : i})
  }

  var [binaryColumns,setBinaryColumns] = React.useState(auxBinaryColumns)

  // And we'll use a state to difference between binary and search

  var [sortingAlgo,setSortingAlgo] = React.useState(false)

  // And the state of the number to search

  var [numberToSearch,setNumberToSearch] = React.useState("")
  var [wrongSearch,setWrongSearch] = React.useState(false)

  function runSearchingAlgo(event){
    event.preventDefault();
    if (numberToSearch>=0 && numberToSearch<=150){
      setWrongSearch(false)
      if (sortingAlgo){
        binarySearch(numberToSearch,binaryColumns,setBinaryColumns)
      }else if(!sortingAlgo){
        linearSearch(numberToSearch,linearColumns,setLinearColumns)
      }
      else{
        setWrongSearch(true)
      }
    } 
    setNumberToSearch("")
  }

  // And we'll setup a restart button just for the linear search

  function restartLinearColumns(){
    auxLinearColumns = []

  for (let i=0; i<150 ; i++){
    var randomNumber = Math.floor(Math.random()*151)
    auxLinearColumns.push({value : randomNumber, color : "#A6F1F5",index : i})
  }
  setLinearColumns(auxLinearColumns)

  }

  return (<div>
      <div className='algorithmsList'>
        <div className='algoButton'>
          <Button size="small" onClick={()=> setSortingAlgo(false)} name="linearSearch" >Linear search </Button>
        </div>
        <div className="algoButton">
          <Button size="small" onClick={()=> setSortingAlgo(true)} name="binarySearch" >Binary search</Button>
        </div>
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
{//Handle wrong search
}
      <div className='search' style={{color : wrongSearch ? "red" : null}} >
        <form onSubmit={runSearchingAlgo}>
          <TextField type="text" size="small"
            onChange={(event)=>{setNumberToSearch(event.target.value)}} 
            value={numberToSearch} 
            placeholder='Search number (0-150)'
            ></TextField>
          <Button type="submit">
            <SearchIcon size="small"/>
          </Button>
        </form>
      </div>
      <div className='restart'>
        <Button size="small" onClick={restartLinearColumns}>Restart</Button>
      </div>
    </div>
  )
}