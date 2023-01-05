
function swapNodes(oppositeNode1,oppositeNode2){
    return [oppositeNode1,oppositeNode2]
}   

function heapify(sortingColumns,currentNode,parentIndex){
    // Due to the heap propertie
    let parent = currentNode
    let parentValue = currentNode.value

    let leftChild = sortingColumns[parentIndex*2]
    let leftChildValue = leftChild.value

    let rightChild = sortingColumns[parentIndex*2 + 1]
    let rightChildValue = rightChild.value

    let max = parent

    if (parentIndex === 0){
        leftChild = sortingColumns[1]
        leftChildValue = sortingColumns[1].value

        rightChild = sortingColumns[2]
        rightChildValue = sortingColumns[2].value
    }

    if (leftChildValue > parentValue){
        max = leftChild
    }
    if (rightChildValue > parentValue){
        max = rightChild
    }

    if (max === parent){
        console.log(leftChild,parent,rightChild)
        return [leftChild,parent,rightChild]
    }else{
        var change = swapNodes(parent,max)
        max = change[0]
        heapify(sortingColumns,max,parentIndex)
    }
}

function heap(sortingColumns,setSortingColumns){
    // A heap is a complete binary tree , meaning that each row is 
    // going to have twice the nodes of the previous one 
    // This propertie allows us to say that if we start by the head
    // of the tree and traverse each node using bfs , the childs of a 
    // nodes will always be at twice the length of the parent node .

    // First we'll have to build the heap out of the input array
    // To do that we are going to use the heapify function , which will
    // place the nodes based on the double the length propertie
    // This way we'll just have to iterate through half the size

    var heapSize = sortingColumns.length - 1
    var halfSize = Math.floor((sortingColumns.length - 1)/2)

    for (let currentPosition=halfSize ; currentPosition>=0 ; currentPosition --){
        const [leftChild,parent,rightChild] = heapify(sortingColumns,sortingColumns[currentPosition],currentPosition)
        sortingColumns[currentPosition] = parent
        sortingColumns[currentPosition*2] = leftChild
        sortingColumns[currentPosition*2+1] = rightChild
        console.log(leftChild,parent,rightChild)
    }

    // Now sorting columns will be locally sorted

    // This will only sort each parent with its children ,but we also want
    // to sort the whole heap so we need another for loop
    // We'll start by the last element of the heap until we reach the beginning

    for (let currentSize=sortingColumns.length-1 ; currentSize>=0 ; currentSize--){

        // We'll send the current array element , which is going to be a child for sure
        // if it is after the half length of the array , and a child and at the same time
        // a parent if it is before the half length of the array , to the first position
        // of the array each time . 

        
    }

    setSortingColumns(sortingColumns)
}

export default function heapSort(sortingColumns,setSortingColumns) {
    const colsCopy = JSON.parse(JSON.stringify(sortingColumns))
    
    heap(colsCopy,setSortingColumns)
};
