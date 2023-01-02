import React from 'react'
import TreeNode from "./TreeNode.jsx"
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';


// Quick reminder that binary tree ≠ binary search tree

export default function BinaryTreeContent() {
  // The same that we did with the linked list , we are going to 
  // create the data structure and work with it naturally , 
  // but to show the changes we need an array because the map 
  // function only works with arrays !
  // This case is a little different because we actually need the
  // real tree to be able to traverse it using bfs , so we'll set 
  // a state for the real tree and another for the mapping array 
  
  // Its likely that all of this could easily be done using a 2D grid and  
  // showing and hiding each node when adding or deleting , but
  // i consider that the real challenge is using a real tree to
  // to support the logic of the operations .  

  var auxNodes = []
  // We'll have a full binary tree of height 4 -> 15 nodes
  var totalNodes = 15
  // We'll also need to diplay the tree -> xposition,yposition
  var xPosition = 74
  var yPosition = 62
  // We'll need to know the current height of each node and have an index for the map array
  var currentHeight = Math.ceil(totalNodes/4)+1
  var index = -1 
  // Relational array that we'll use to locate the nodes
  var heightsShifts = [30 , 23/2 , 11.75/2 , 6/2]

  // Each height of a binary tree doubles the length ,so we are
  // going to use this propertie as the upper boundarie to limit
  // the creation of nodes in the same height
  for (let i=totalNodes ; i>=1 ; i/=2){
    // We round up in j because the first element of the tree will make it odd
    var nodesInHeight = Math.ceil(i/2)
    // All nodes at same height will have same yPosition
    yPosition -= 12.5
    // For each height xPosition will have to start sooner ,
    currentHeight -= 1
    if (nodesInHeight === 8){
      xPosition = 2.5
    }else if (nodesInHeight === 4){
      xPosition = 0
    }else if (nodesInHeight === 2){
      xPosition = -5.5
    }else if (nodesInHeight === 1){
      xPosition = 29
    }

    for (let j=nodesInHeight ; j>0 ; j--){
      var randomNumber = Math.floor(Math.random() * 16)

      // We update xPosition for each node in the same height . Initial values
      if (nodesInHeight === 8){
        var shiftHeight = 6
        xPosition += shiftHeight
      }else if (nodesInHeight === 4){
        shiftHeight = 11.75
        xPosition += shiftHeight
      }else if (nodesInHeight === 2){
        shiftHeight = 23
        xPosition += shiftHeight
      }
      
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
        index : index,
        height : currentHeight,
        heightShiftXPosition : shiftHeight
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

  // And we'll add a key to mark the head so that we dont allow its deletion when mapping
  auxNodes[auxNodes.length-1] = {
    ...auxNodes[auxNodes.length-1] ,
    head : true 
  }

  // The state that will be mapped 
  var [treeNodes,setTreeNodes] = React.useState(auxNodes)

  // And the real binary tree 
  var [head,setHead] = React.useState(auxNodes[auxNodes.length-1])

  // The node that the user will input 
  var [nodeToAdd,setNodeToAdd] = React.useState("")

  // We'll limit the number of nodes that can be added by hiding the add 
  // node input when the length of the nodes is the maximum that we allow
  var [blockNodeAdd,setBlockNodeAdd] = React.useState(true)

  function addTreeNode(event){
    event.preventDefault();

    // We are going to add nodes left to right from first popped height from the head 
    setTreeNodes(prev =>{
      var oldTreeNodes = JSON.parse(JSON.stringify(prev))

      // We are going to perform bfs to traverse the tree , because we want
      // to fill the empty spaces as nodes are introduced .We'll start from the head
      // and so we are going to use the real binary tree and its state !

      var lastNode = JSON.parse(JSON.stringify(head))
      var queue = []
      queue.push(lastNode)
      // The variable that will tell the empty child from the parent perspective
      var childNumber = ""
      // We'll traverse the tree looking for a parent without any child and when we
      // find it we'll break out of the loop
      while (queue.length !== 0){
        lastNode = queue.shift();

        // We'll pop nodes out of the queue until we find a null child,when we'll break

        // First we handle edge case where a node has to be added as first child of parent
        if (lastNode.child1 == null && lastNode.child2 == null){
          childNumber = "both"
          // We are going 2 different cases : the parent node has other neighbours that have
          // children , and the parent node doesnt have neighhbours with children
          
          // To do that we are going to check through the same height of the parent
          const parentHeight = lastNode.height
          const parentIndex = lastNode.index

          // We'll traverse the tree checking the nodes that have the same height and we'll 
          // choose the one with the biggest index because it will be the closest to child to add
          var parentNeighbour = JSON.parse(JSON.stringify(head))
          queue = []
          queue.push(parentNeighbour)
          var previousChildIndex = 0

          while (queue.length !== 0){

            parentNeighbour = queue.shift()
            if (parentNeighbour.height === parentHeight && parentNeighbour.index < parentIndex){

              // We are adding child1 first to the queue, so we'll be popping out as first node child1 ,
              // what is enough to say that the first time that we find a child , it will be the closest
              if (parentNeighbour.child1 !== null ){
                previousChildIndex = parentNeighbour.child1.index + 1
                break;
              // Need to implement elseif not to overwrite closest node if theres child2 ,which will be more far away
              }else if(parentNeighbour.child2 != null){
                previousChildIndex = parentNeighbour.child2.index + 1
                break;
              }
            }

            if (parentNeighbour.child1 != null){
              queue.push(parentNeighbour.child1)
            }
            if (parentNeighbour.child2 != null){
              queue.push(parentNeighbour.child2)
            }
          }
          break;
        // Now we'll handle the addition of the node as child 1
        }else if (lastNode.child1 == null){
          childNumber = "child1"
          break;
        // And as child 2
        }else if (lastNode.child2 == null){
          childNumber = "child2"
          break;
        }
        queue.push(lastNode.child1)
        queue.push(lastNode.child2)
      }

      // We'll use the parent node to fill some properties to define the new one

      const lastNodeYPosition = lastNode.yPosition;
      const lastNodeHeight = lastNode.height

      // Now we'll handle the position of the node . To do that we are going to 
      // take the parent position , and add a shift based on the height of the 
      // parent , because each height has a particular and characteristic distance
      // between nodes . We'll use the array defined at the beginning that stores half distances
      var indexToPlace = 0

      var parentHeight = lastNode.height ; 
      var childShift = heightsShifts[parentHeight];
      
      // The different scenarios based on the position to locate the node based on 
      // on the result popped in the parent in the queue
      if (childNumber === "child1"){
        indexToPlace = lastNode.child2.index + 1
        var newXPosition = lastNode.xPosition + childShift
      }else if (childNumber ==="child2"){
        indexToPlace = lastNode.child1.index 
        newXPosition = lastNode.xPosition - childShift
      }else if (childNumber ==="both"){
        indexToPlace = previousChildIndex
        newXPosition = lastNode.xPosition + childShift
      }

      // Now we are going to create the node based on the number of the input
      // Also ,we are just going to add one node , so we set both child1 and 2 to null
      var newNode = {
        value : Number(nodeToAdd),
        child1 : null,
        child2 : null,
        xPosition : newXPosition,
        yPosition : lastNodeYPosition+12.5,
        index : "definedLater",
        height : lastNodeHeight + 1
      }
      // Must overwrite childnumber if it comes from both not to create new key both
      if (childNumber === "both"){
        childNumber = "child1"
      }
      // We make the parent node in the array point to the new node
      oldTreeNodes[lastNode.index][childNumber] = newNode
      // We'll add the new node to the right index
      oldTreeNodes.splice(indexToPlace,0,newNode)
      
      // And we must update the rest of the nodes indexes with the new size of the array 
      // We are just going to traverse it all
      for ( let i=0 ; i<oldTreeNodes.length ; i++){
        oldTreeNodes[i].index = i
      }

      // Also need to update the head of the binary tree , the real binary tree,
      // because we'll need it for next head traverses
      // We'll just modify the parent of the new node and return the original head saved before

      // Need to setup this boolean variable to avoid the setHead from running 2 times
      // Cant understand why it happens but this fixes it because it avoid rerun in the loop
      // Maybe it is related to the fact that we are updating a state inside the update of another state
      var found = false

      setHead((prev)=>{
        var newHead = JSON.parse(JSON.stringify(prev))
        var traverseTree = newHead

        var queue = []
        queue.push(traverseTree)

        while (found === false){
          traverseTree = queue.shift();

          // We'll develop the 3 possible scenarios , avoiding the double render mistery in all of them
          // If we are in the both case we'll add it as first child
          if (traverseTree.child1 == null && traverseTree.child2 == null && found === false){
            traverseTree.child1 = newNode
            found = true
          }
          else if (traverseTree.child1 == null && traverseTree.child2 != null && found === false){
            traverseTree.child1 = newNode
            found = true
          }
          else if (traverseTree.child1 != null && traverseTree.child2 == null && found === false){
            traverseTree.child2 = newNode
            found = true
          }

          if (traverseTree.child1 != null){
            queue.push(traverseTree.child1)
          }
          if (traverseTree.child2 != null){
            queue.push(traverseTree.child2)
          }
        }

        // And we also need to update the indexes for the real tree 
        var indexUpdate = newHead
        queue = []
        queue.push(indexUpdate)
        var indexCounter = treeNodes.length

        while (queue.length !== 0){
          indexUpdate = queue.shift();

          indexUpdate.index = indexCounter
          indexCounter -= 1

          if (indexUpdate.child1 != null){
            queue.push(indexUpdate.child1)
          }
          if (indexUpdate.child2 != null){
            queue.push(indexUpdate.child2)
          }
        }
        return newHead
      })
      return oldTreeNodes
    })
    setNodeToAdd("")

    // And we'll limit the input of the nodes of the tree hiding the bar to add when max size
    if (treeNodes.length >= 14){
      setBlockNodeAdd(true)
    }else{
      setBlockNodeAdd(false)
    }
  }

  function deleteTreeNode(nodeToDelete){

    // Now we are going to delete a node . Of course ,this implies that 
    // all of its children must also be deleted 

    setTreeNodes(prev=>{
      var oldTreeNodes = JSON.parse(JSON.stringify(prev))

      // We'll need to update the map array but also the real tree .We'll start with the array
      // We'll use the map array to show the visual results and the real tree to make the map
      // array behave like a real tree => real tree = helper
      // We'll do it this way because doing everything inside the map array should imply much more code !
      
      // We need to set the child of the parent of the pressed node to null in order to delete it,so we'll
      // traverse the tree until we find the parent ,when we will break out of the loop

      var originalNode = JSON.parse(JSON.stringify(head))
      var lastNode = originalNode
      var queue = []
      queue.push(lastNode)

      // We initialize the variable that will tell whose child is it from the parent standpoint
      // so that we can set the parent pointing to it to null
      var childNumber =  ""

      // We'll traverse the node until we find the parent of the node to delete using bfs !
      while (queue.length !== 0){
        lastNode = queue.shift();

        // We'll perform bfs adding and popping nodes from the queue until empty,
        // making sure that we dont add null nodes ,and if we find the node to delete 
        // in a child we are just going to break out of the loop
        // We'll also handle not null node in the check of the child to handle corner
        // case of the parent being the root node of the tree and child1 == null

        // The check 
        if (lastNode.child1 != null && lastNode.child1.index === nodeToDelete){
          childNumber = "child1"
          break;
        }
        if (lastNode.child2 != null && lastNode.child2.index === nodeToDelete){
          childNumber = "child2"
          break;
        }

        // BFS
        if (lastNode.child1 != null){
          queue.push(lastNode.child1)
        }
        if (lastNode.child2 != null){
          queue.push(lastNode.child2)
        }
      }

      // Now we'll update the relationships inside the keys of the parent node to show the new situation
      // This could be skipped without any consequence but we'll modify it anyway because of consistency purposes 
      const parentIndex = lastNode.index

      oldTreeNodes[parentIndex][childNumber] = null

      // We also have to delete the mapping of the node to visually show the changes => map array
      // We'll use the real tree state to get the indexes of the nodes to delete => helper
      var childsIndexes = []

      // Given that last node is the parent, we just have to acces to the current node to delete it
      // using the variable that identifies which child broke the bfs loop
      var familyToDelete = lastNode[childNumber]

      // And we perform BFS once again with the parent node
      queue = []
      queue.push(familyToDelete)

      while (queue.length !== 0){
        const childToDelete = queue.shift();

        if (childToDelete !== null){ 
          childsIndexes.push(childToDelete.index)

          queue.push(childToDelete.child1)
          queue.push(childToDelete.child2)
        }
      }

      // Now we'll delete the nodes given by the indexes one by one starting from the end and up 
      //  We'll need to do it this way to take into account inverse order of the nodes in the map array

      for ( let i=0 ; i<=childsIndexes.length-1 ; i++){
        oldTreeNodes.splice(childsIndexes[i],1)
      }

      // After the deletion of the nodes , we need to redefine the indexes of
      // each node in the array because we delete items using the index that they
      // store to find the position in the array , and so if we want to delete more
      //  afterwards we'll need the correct indexes to locate them succesfully !
      for ( let i=oldTreeNodes.length-1 ; i>=0 ; i--){
        oldTreeNodes[i].index = i
      }

      // We'll also update the real binary tree because we'll need it for the next bfs
      // traverses when next nodes are deleted !
      const parentHeight = JSON.parse(JSON.stringify(lastNode.height))

      var runOnlyOnce = false 
    setHead((prev)=>{

      // To prevent it from running twice ,which i dont know why it happens but maybe 
      // because we are updating a state inside the update of another state ?
      if (runOnlyOnce){return prev}
      runOnlyOnce = true

      // We'll take the previous tree state to modify it
      const headTreeUpdate = JSON.parse(JSON.stringify(prev))

      // We'll assign the head of the binary tree with another name that we are going to
      // use to traverse it . Given that is an assignation , it will represent or point to the same 
      // element , the tree , and so the changes that we make to treeUpdate will be the
      // changes that we make to the tree itself , whose head is headTreeUpdate .We'll return the head
      var treeUpdate = headTreeUpdate
      var queue = []
      queue.push(treeUpdate)
      

      // Same loop as before , BFS until we find the node to delete as a child
      while (queue.length !== 0){
        treeUpdate = queue.shift()

        // The check
        if (treeUpdate.child1 != null && treeUpdate.child1.index === nodeToDelete && treeUpdate.height === parentHeight){
          treeUpdate.child1 = null
          break;
        }
        if (treeUpdate.child2 != null && treeUpdate.child2.index === nodeToDelete && treeUpdate.height === parentHeight){
          treeUpdate.child2 = null
          break;
        }

        // BFS
        if (treeUpdate.child1 != null){
          queue.push(treeUpdate.child1)
        }
        if (treeUpdate.child2 != null){
          queue.push(treeUpdate.child2)
        }
      }

      // Need to take into account how many nodes were deleted to resize the indexes,
      // which will depend on the children nested inside nodeToDelete
      // This can be done using different methods , but probably one of the easiest 
      // is using the nodes state

      var indexUpdate = headTreeUpdate
      queue = []
      queue.push(indexUpdate)

      // We'll discount the nodes trying to be deleted to the current tree to set the new indexes
      var indexCounter = oldTreeNodes.length - 1

      // And BFS once again 
      while(queue.length !== 0){
        indexUpdate = queue.shift()

        if (indexUpdate.child1 !== null){
          queue.push(indexUpdate.child1)
        }
        if (indexUpdate.child2 !== null){
          queue.push(indexUpdate.child2)
        }
        // And we update the current node index
        indexUpdate.index = indexCounter
        indexCounter -= 1
      }
      // We return the head that saves all the binary tree with the changes made
      return headTreeUpdate
     })
      return oldTreeNodes
    })

    // We'll unlock the addition of nodes if less than max length 
    if (treeNodes.length <= 15){
      setBlockNodeAdd(false)
    }
  }

  return (<div>
      {treeNodes.map( (node,index) => {
        return <TreeNode 
          key={index} 
          value={node.value}
          head={node.head}
          xPosition={node.xPosition}
          yPosition={node.yPosition}
          index={node.index}
          deleteTreeNode={deleteTreeNode}
           />
      })}

      <div className='addTreeNode'>
        {blockNodeAdd ? null : 
        <form onSubmit={addTreeNode}>
          <TextField onChange={(event)=>{setNodeToAdd(event.target.value)}} 
          value={nodeToAdd} 
          type="text" 
          placeholder='Add node'
          size="small">
          </TextField>
          <Button type="submit">
            <AddIcon size="small"/>
          </Button>
        </form>}
      </div>
   
    </div>
  )
}
