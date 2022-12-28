import { eventWrapper } from '@testing-library/user-event/dist/utils/index.js'
import React from 'react'
import ListNode from "./ListNode.jsx"

export default function LinkedListContent() {

    var listNodes = []

    var randomNumber = Math.floor(Math.random()*11)

    var xPosition = 5
    var yPositionUp = 20
    var yPositionDown = 30

    listNodes[10] = {value : randomNumber, xPosition : xPosition , yPosition : yPositionUp, nextNode : null,index : 10,booleanYPositionUp : true}

    // A linked list has a next node nested inside each node , but given that that node will 
    // also have a next node nested and so on , the final result is that the first node 
    // will contain all the elements of the list . 

    // We will create the linked list starting from the end , using the intial value that points
    // to null , and we will just nest the previous node created as we descend to the begginig 
    // of the linked list , causing the effect previsouly described 

    for (let i=9 ; i>=0 ; i--){
      randomNumber = Math.floor(Math.random()*11)
        if (i%2 === 0){
          listNodes[i] = {
            value : randomNumber, 
            xPosition : xPosition += 5 , 
            yPosition : yPositionUp, 
            nextNode : listNodes[i+1],
            index : i ,
            booleanYPositionUp : true
          }
        }else {
          listNodes[i] = {value : randomNumber, 
            xPosition : xPosition += 5 , 
            yPosition : yPositionDown, 
            nextNode : listNodes[i+1],
            index : i ,
            booleanYPositionUp : false
          }
        }
    }

    var [nodes,setNodes] = React.useState(listNodes)
    var [newNode , updateNewNode] = React.useState("")

    // The function that will add nodes to the end

    function addNode(event){
      event.preventDefault();
      setNodes( prev => {
        const oldNodes = JSON.parse(JSON.stringify(prev))

        // We are going to specify the new node properties based on last one
        const lastOldNode = oldNodes.length - 1
        const lastOldNodeIndex = oldNodes[lastOldNode].index
        const lastOldNodeXPosition = oldNodes[lastOldNode].xPosition

        // Check yPosition from 2 alternatives . Indicated in each key
        const lastOldNodeYPosition = oldNodes[lastOldNode].booleanYPositionUp

        const nodeToAdd = {
          value : Number(newNode),
          xPosition : lastOldNodeXPosition - 5,
          yPosition : lastOldNodeYPosition ? yPositionDown : yPositionUp ,
          nextNode : null ,
          index : lastOldNodeIndex + 1 ,
          booleanYPositionUp : lastOldNodeYPosition ? false : true 
        }

        // Add the new node to the state
        oldNodes.push(nodeToAdd)

        // Make the old last node point to the new node
        oldNodes[lastOldNode].nextNode = nodeToAdd

        return oldNodes

      });
      updateNewNode("")
    }

    // Need to take the pressed node as input to delete it ? 
    function deleteNode(event){
      event.preventDefault();
      const indexToDelete = event.target.name
      
      setNodes( prev => {
        const oldNodes = JSON.parse(JSON.stringify(prev))

        // We will make previous pointer point to next node .We'll have to handle
        // 2 cases , if it is last node or it isnt :
        // Last -> points to null ; Not last -> points to where the item to delete points

        if  (oldNodes[indexToDelete].nextNode === null){
          oldNodes[indexToDelete-1].nextNode = null
        }else if (oldNodes[indexToDelete].nextNode !== null){
          //////////////// FFFFFFIIIIIIIXXXXXXX
          oldNodes[indexToDelete-1].nextNode = oldNodes[indexToDelete].nextNode
        }

        // And we delete the node from the array 
        oldNodes.splice(indexToDelete,1)

        // Now we also have to handle the change in xposition,yposition,index and booleanup ,
        // The node's value and next node pointing will be the same 

        for (let i=indexToDelete-1 ; i<oldNodes.length ; i++){
          const previousNode = oldNodes[i-1]

          oldNodes[i] = {
          value : oldNodes[i].value,
          xPosition : previousNode.xPosition - 5,
          yPosition : previousNode.booleanYPositionUp ? yPositionDown : yPositionUp ,
          nextNode : oldNodes[i].nextNode ,
          index : previousNode.index + 1 ,
          booleanYPositionUp : previousNode.booleanYPositionUp ? false : true 
          }
        }
        return oldNodes
      });
    }

    console.log(nodes)

  return ( <div >
      {nodes.map((node,index)=>{
        return <div>
          <ListNode 
          xPosition={node.xPosition} 
          yPosition={node.yPosition} 
          value={node.value} 
          key={index} 
          />
          <button name={index} onClick={deleteNode}></button>
        </div>
      })}
      <div className='addNode'>
        <form onSubmit={addNode}>
          <input onChange={(event)=>updateNewNode(event.target.value)} value={newNode} type='text' placeholder='Add node'></input>
          <input type='submit'></input>
        </form>
      </div>
    </div>
  )
}
