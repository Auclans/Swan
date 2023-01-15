import React from 'react'
import SlidingWindowContent from "./SlidingWindowContent.jsx"
import BinaryTreeContent from "./BinaryTreeContent.jsx"
import LinkedListContent from "./LinkedListContent.jsx"
import Button from '@mui/material/Button';


export default function OtherAlgorithms() {

  var [linkedList,setLinkedList] = React.useState(false)
  var [binaryTree,setBinaryTree] = React.useState(false)

  function algoPressed(event){

    setLinkedList(false)
    setBinaryTree(false)

    if (event.target.name === "linkedList"){
      setLinkedList(true)
    }else if (event.target.name === "binaryTree"){
      setBinaryTree(true)
    }
  }

  return (<div>
      <div className='algos'>
        <div className='algoButton'>
          <Button size="small" onClick={algoPressed} >Sliding window</Button>
        </div>
        <div className='algoButton'>
          <Button size="small" onClick={algoPressed} name="linkedList" >Linked list</Button>
        </div>
        <div className='algoButton'>
          <Button size="small" onClick={algoPressed} name="binaryTree" >Binary tree</Button>
        </div>
      </div>
      <div >
        {linkedList ? 
        <LinkedListContent/> 
        : 
        binaryTree ? 
        <BinaryTreeContent/> 
        : 
        <SlidingWindowContent/>}
      </div>
    </div>
  )
}
