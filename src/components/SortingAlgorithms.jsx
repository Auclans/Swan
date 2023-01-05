import React from 'react'
import mergeSort from "../mergeSort.js"
import quickSort from "../quickSort.js"
// import heapSort from "../heapSort.js"
import Column from './Column.jsx'
import Button from '@mui/material/Button';


export default function SortingAlgorithms() {

  // First we'll generate an auxiliar  array of random 
  // data that is going that is going to initialize the bars
  
  var auxColumns = []

  for (let i=0; i<150 ; i++){
    var randomNumber = Math.floor(Math.random()*151)
    auxColumns.push({value : randomNumber, color : "#A6F1F5",index : i})
  }

  // We define a state with the array created because we will
  // need to keep track of the changes when we run the algos 
  
  var [sortingColumns,setSortingColumns] = React.useState(auxColumns)

  function sortingAlgoPressed(event){
    const name = event.target.name

    if(name === "mergeSort"){
      mergeSort(sortingColumns,setSortingColumns)
    }else if (name === "quickSort"){
      quickSort(sortingColumns,setSortingColumns)
    }
    // Temporary disabled , testing
    // else if (name === "heapSort"){
    //   heapSort(sortingColumns,setSortingColumns)
    // }
  }

  // And we'll setup a restart button

  function restartColumns(){
    auxColumns = []

    for (let i=0; i<150 ; i++){
      var randomNumber = Math.floor(Math.random()*151)
      auxColumns.push({value : randomNumber, color : "#A6F1F5",index : i})
    }
    setSortingColumns(auxColumns)
  }

  return (<div>
      <div className='algorithmsList'>
        <div className='algoButton'>
          <Button size="small" onClick={sortingAlgoPressed} name="mergeSort">Merge sort</Button>
        </div>
        <div className='algoButton'>
          <Button size="small" onClick={sortingAlgoPressed} name="quickSort">Quick sort</Button>
        </div>
        {/* <div className='algoButton'>
          <Button size="small" onClick={sortingAlgoPressed} name="heapSort" >Heap sort</Button>
        </div> */}
      </div>
      <div className='algoContent'>
        {sortingColumns.map( (column,index) => {
          return <Column key={index} column={column.value} color={column.color}/>
        })}
      </div>
      <div className='restart'>
        <Button size="small" onClick={restartColumns}>Restart</Button>
      </div>
    </div>
  )
}

