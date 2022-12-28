import React from 'react'
import mergeSort from "../mergeSort.js"
import quickSort from "../quickSort.js"
import heapSort from "../heapSort.js"
import countingSort from "../countingSort.js"
import Column from './Column.jsx'

export default function SortingAlgorithms() {

  // First we'll generate an auxiliar  array of random 
  // data that is going that is going to initialize the bars
  
  var auxColumns = []

  for (let i=0; i<150 ; i++){
    var randomNumber = Math.floor(Math.random()*151)
    auxColumns.push({value : randomNumber, color : "lightBlue",index : i})
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
    }else if (name === "heapSort"){
      heapSort(sortingColumns,setSortingColumns)
    }else if (name === "countingSort"){
      countingSort(sortingColumns,setSortingColumns)
    }
  }

  // And we'll setup a restart button

  function restartColumns(){
    auxColumns = []

  for (let i=0; i<150 ; i++){
    var randomNumber = Math.floor(Math.random()*151)
    auxColumns.push({value : randomNumber, color : "lightBlue",index : i})
  }
  setSortingColumns(auxColumns)

  }

  return (<div>
      <div className='algorithmsList'>
        <button onClick={sortingAlgoPressed} name="mergeSort" className='algoButton'>Merge sort</button>
        <button onClick={sortingAlgoPressed} name="quickSort" className='algoButton'>Quick sort</button>
        <button onClick={sortingAlgoPressed} name="heapSort" className='algoButton'>Heap sort</button>
        <button onClick={sortingAlgoPressed} name="countingSort" className='algoButton'>Counting sort</button>
      </div>
      <div className='algoContent'>
        {sortingColumns.map( (column,index) => {
          return <Column key={index} column={column.value} color={column.color}/>
        })}
      </div>
      <div className='restart'>
        <button onClick={restartColumns}>Restart</button>
      </div>
    </div>
  )
}

