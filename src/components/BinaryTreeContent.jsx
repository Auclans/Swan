import React from 'react'
import TreeNode from "./TreeNode.jsx"

// Quick reminder that binary tree ≠ binary search tree

export default function BinaryTreeContent() {
  // The same that we did with the linked list , we are going to 
  // create the data structure and work with like naturally , 
  // but to show the changes we need an array because the map 
  // function only works with arrays !
  // This case is a little different because we actually need the
  // real tree to be able to traverse it using bfs , so we'll set 
  // a state for the real tree and another for the mapping array 

  var auxNodes = []
  // We'll have a full binary tree of height 4 -> 15 nodes
  var totalNodes = 15
  // We'll also need to diplay the tree -> xposition,yposition
  var xPosition = 74
  var yPosition = 50

  var index = -1 

  // Each height of a binary tree doubles the length ,so we are
  // going to use this propertie as the upper boundarie to limit
  // the creation of nodes in the same height
  for (let i=totalNodes ; i>=1 ; i/=2){
    // We round up in j because the first element of the tree will make it odd
    var nodesInHeight = Math.ceil(i/2)
    // All nodes at same height will have same yPosition
    yPosition -= 10
    // For each height xPosition will have to start sooner 
    xPosition -= 9*nodesInHeight
    for (let j=nodesInHeight ; j>0 ; j--){
      var randomNumber = Math.floor(Math.random() * 16)

      // We update xPosition for each node in the same height 
      xPosition += 6
      
      // We update the index for each node
      index += 1

      // We'll define the children of each node using the heap notation
      // To define the children of each node ,we'll see how many there are still in 
      // the same height + how many we must traverse in next
      // Need to inverse rest in same height because we are traversing the tree
      // backwards in order to be able to point to next nodes existing !
      var restInSameHeight = nodesInHeight - j
      var restInNextHeight = 2*j-1
      // Again we add auxNodes.length because we are traversing the tree inversely
      var child1 = auxNodes[auxNodes.length  - restInSameHeight-restInNextHeight]
      var child2 = auxNodes[auxNodes.length - restInSameHeight-restInNextHeight-1]

      // The base case node will look like this
      var auxNode = {
        value : randomNumber,
        child1 : child1,
        child2 : child2,
        xPosition : xPosition,
        yPosition : yPosition,
        index : index
      }

      // If we are in the last height the nodes must point to null 
      if (i === totalNodes){
        auxNode = {
          ...auxNode ,
          child1 : null,
          child2 : null
        }
      }

      auxNodes.push(auxNode)
    }
  }

  // The state that will be mapped 
  var [treeNodes,setTreeNodes] = React.useState(auxNodes)
console.log("map",treeNodes)
  // And the real binary tree 
  var [head,setHead] = React.useState(auxNodes[auxNodes.length-1])
console.log("tree",head)

  // The node that the user will input 
  var [nodeToAdd,setNodeToAdd] = React.useState("")

  function addTreeNode(event){
    event.preventDefault();

    // We are going to add the node to the left of the last height
    setTreeNodes(prev =>{
      var oldTreeNodes = JSON.parse(JSON.stringify(prev))

      // We are going to perform bfs to traverse the tree , because we want
      // to fill the empty spaces as nodes are filled .We'll start from the head
      // and so we are going to use the real binary tree and its state !

      var lastNode = JSON.parse(JSON.stringify(head))
      var originalNode = lastNode
      var queue = []
      queue.push(lastNode)

      // As soon as we detect empty node we'll fill it
      while (lastNode.child1 && lastNode.child2){
        lastNode = queue.shift();
        queue.push(lastNode.child1)
        queue.push(lastNode.child2)
      }

      // We'll use the node to fill properties to define the new one
      const lastNodeXPosition = lastNode.xPosition;
      const lastNodeYPosition = lastNode.yPosition;
      const lastNodeIndex = lastNode.index;
// to handle position just must differ between child 1 and child 2 , the rest is the same 
// height will always increment because it will be a child , and so row.column and xposition need actual row info
// Bfs handles height automatically ! -> always child
// just fix column and xposition
// xposition must be given by height ! create key to acces to the current shift of height ? -> .shiftHeight[row]
// Also update column -> only wrong xposition and col
      // Handle of xPosition 
      if(!lastNode.child1){
        var newXPosition = lastNodeXPosition + 6
      }else if (!lastNode.child2){
        newXPosition = lastNodeXPosition - 6
      }

      const newNode = {
        value : Number(nodeToAdd),
        child1 : null,
        child2 : null,
        xPosition : newXPosition,
        yPosition : lastNodeYPosition+10,
        index : 0
      }

      // We'll add the new node to the beginning of the array because the head
      // is placed at the end
      oldTreeNodes.unshift(newNode)

      // Must fill the case that broke the loop , either child1 or child2,
      // that is make it point the new node.If both child1 will be first
      // Need to take into account that we have just added the new node

      if(!lastNode.child1){
        oldTreeNodes[lastNodeIndex+1].child1 = newNode
      }else if (!lastNode.child2){
        oldTreeNodes[lastNodeIndex+2].child2 = newNode
      }

      // Also need to update the head of the binary tree , the real binary tree,
      // because we'll need it for next head traverses
      // We'll just modify the parent of the new node and return the original head saved before

      setHead(() => {
        if (!lastNode.child1){
          lastNode.child1 = newNode
        }else if (!lastNode.child2){
          lastNode.child2 = newNode
        }
        
        return originalNode
      })

      return oldTreeNodes

    })
  }

  function deleteTreeNode(nodeToDelete){

    // If node deleted ,delete all of his children !!!
    // Pass function through props to redirect to this functin from TreeNode

    setTreeNodes(prev=>{
      var oldTreeNodes = JSON.parse(JSON.stringify(prev))

      // We'll need to update the map array but also the real tree .We'll start with the array
      
      // We need to set the child of the parent of the pressed node to null,so we'll
      // traverse the tree until we find the parent

      var originalNode = JSON.parse(JSON.stringify(head))
      var lastNode = originalNode
      var queue = []
      queue.push(lastNode)

      // We'll traverse the node until we find the parent of the node to delete using bfs !
      while (lastNode.child1.index !== nodeToDelete && lastNode.child2.index !== nodeToDelete){
        lastNode = queue.shift()
        // To avoid undefined.index in while loop
        if (lastNode.child1){
          queue.push(lastNode.child1)
        }
        if (lastNode.child2){
          queue.push(lastNode.child2)
        }
      }

      // Now we'll update the relationships inside the keys of the parent node to show the new situation
      // This could be skipped without any consequence but we'll modify it anyway for consistency purposes 
      const parentIndex = lastNode.index

      if (lastNode.child1.index === nodeToDelete){
        oldTreeNodes[parentIndex].child1 = null
      }else if (lastNode.child2.index === nodeToDelete){
        oldTreeNodes[parentIndex].child2 = null
      }

      // We also have to delete the mapping of the node taking into account inverse order
      // We'll use the real tree state to get the indexes of the nodes to delete
      var childsIndexes = []

      // Given that last node is the parent we have to acces to the current node to delete
      // which will be child 1 or 2 from parent
      if (lastNode.child1.index === nodeToDelete){
        var familyToDelete = lastNode.child1
      }else if (lastNode.child2.index === nodeToDelete){
        familyToDelete = lastNode.child2
      }
   
      queue = []
      queue.push(familyToDelete)
      // This time we'll traverse the nodes using bfs until queue is empty because we want to delete everything
      while (queue.length !== 0){
        const childToDelete = queue.shift();
        // To avoid crashing of the last node
        if (childToDelete){ 
          childsIndexes.push(childToDelete.index)

          queue.push(childToDelete.child1)
          queue.push(childToDelete.child2)
        }
      }
      console.log(nodeToDelete,childsIndexes)
      console.log(oldTreeNodes)
// PROBLEM IS HERE ----------------------------------------------------------------------------------
// IT IS THE UPDATE OF THE INDEX WHEN DELETING AND UPDATING !!! WE DELETE BASED ON POSITION IN THE ARRAY ,TAKING THE INDEX !!!
      // Now we'll delete the nodes given by the indexes one by one starting 
      // from the end and up . We'll need to take into account inverse order
      for ( let i=0 ; i<childsIndexes.length ; i++){
        oldTreeNodes.splice(childsIndexes[i],1)
      }

      // After the deletion of the nodes , we need to redefine the indexes of
      // each node in the array because we delete items using the index that they
      // store to find the position in the array , and so if we want to delete more
      //  afterwards we'll need the correct indexes to locate them succesfully

      for ( let i=oldTreeNodes.length-1 ; i>=0 ; i--){
        oldTreeNodes[i] = {
          ...oldTreeNodes[i],
          index : i
        }
      }
      return oldTreeNodes
    })

    // We'll also update the real binary tree because we'll need it for the next bfs
    // traverses when next nodes are deleted !
    setHead((prev)=>{
      // We'll take the previous tree state to modify it
      const headTreeUpdate = JSON.parse(JSON.stringify(prev))
      // We'll assign the head of the binary tree with another name that we are going to
      // use to traverse it . Given that is an assignation , it will represent or point to the same 
      // element , the tree , and so the changes that we make to treeUpdate will be the
      // changes that we make to the tree itself , whose head is headTreeUpdate .We'll return the head

      var treeUpdate = headTreeUpdate
      var queue = []
      queue.push(treeUpdate)

      // Same loop as before , bfs until we find the node to delete as a child
      while (treeUpdate.child1.index !== nodeToDelete && treeUpdate.child2.index !== nodeToDelete){
        treeUpdate = queue.shift()
        if (treeUpdate.child1){
          queue.push(treeUpdate.child1)
        }
        if (treeUpdate.child2){
          queue.push(treeUpdate.child2)
        }
      }
      // Based on the position of the node to delete from the parent standpoint 
      // we'll delete it and including automatically all of its children
      if (treeUpdate.child1.index === nodeToDelete){
        treeUpdate.child1 = null
      }else if (treeUpdate.child2.index === nodeToDelete){
        treeUpdate.child2 = null
      }

      // Also we'll need to update the indexes of the nodes for further deletions,
      // just like we did with map nodes 
      var indexUpdate = headTreeUpdate
      queue = []
      queue.push(indexUpdate)
      // Need to take into account that if we are here we deleted one node
      var indexCounter = treeNodes.length - 2

      while(queue.length !== 0){
        indexUpdate = queue.shift()

        if (indexUpdate.child1){
          queue.push(indexUpdate.child1)
        }
        if (indexUpdate.child2){
          queue.push(indexUpdate.child2)
        }
        // And we update the current node index
        indexUpdate.index = indexCounter
        indexCounter -= 1
      }
      // We return the head that saves all the binary tree from the head
      return headTreeUpdate
     })
  }

  return (<div>
      {treeNodes.map( (node,index) => {
        return <TreeNode 
          key={index} 
          value={node.value}
          height={node.height} 
          child1={node.child1}
          child2={node.child2}
          xPosition={node.xPosition}
          yPosition={node.yPosition}
          row={node.row}
          column={node.column}
          index={node.index}
          deleteTreeNode={deleteTreeNode}
           />
      })}
      <div className='addTreeNode'>
        <form onSubmit={addTreeNode}>
          <input onChange={(event)=>{setNodeToAdd(event.target.value)}} 
          value={nodeToAdd} 
          type="text" 
          placeholder='Add node'>
          </input>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  )
}
