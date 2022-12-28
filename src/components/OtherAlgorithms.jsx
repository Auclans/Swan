import React from 'react'
import SlidingWindowContent from "./SlidingWindowContent.jsx"
import BinaryTreeContent from "./BinaryTreeContent.jsx"
import LinkedListContent from "./LinkedListContent.jsx"

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
      <div className='algorithmsList'>
        <button onClick={algoPressed} className='algoButton'>Sliding window</button>
        <button onClick={algoPressed} name="linkedList" className='algoButton'>Linked list</button>
        <button onClick={algoPressed} name="binaryTree" className='algoButton'>Binary tree</button>
      </div>
      <div>
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
