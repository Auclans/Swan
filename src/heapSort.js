
function swapNodes(oppositeNode1,oppositeNode2){
    return [oppositeNode1,oppositeNode2]
}   

function heapify(sortingColumns,currentSize){
    // Due to the heap propertie
    var parent = sortingColumns[currentSize].value
    var leftChild = sortingColumns[currentSize*2].value
    var rightChild = sortingColumns[currentSize*2 + 1].value

    if (currentSize === 0){
        console.log("beginning")
        leftChild = sortingColumns[1].value
        rightChild = sortingColumns[2].value
    }
//console.log("ini",leftChild,parent,rightChild)
    // First we'll check if the left child is greater than the parent
    if (leftChild > parent){
        [parent,leftChild] = swapNodes(leftChild,parent,sortingColumns)
    }
    // Knowing if left is grater or not than parent we'll check the right
    if (rightChild > parent){
        [parent,rightChild] = swapNodes(rightChild,parent,sortingColumns)
    }
    // Right child must also be greater that left child
    if (rightChild > leftChild){
        [rightChild,leftChild] = swapNodes(rightChild,leftChild,sortingColumns)
    }
    sortingColumns[currentSize].value = parent
    sortingColumns[currentSize*2].value = leftChild
    sortingColumns[currentSize*2+1].value = rightChild
//console.log("res",leftChild,parent,rightChild)
//console.log("indexes",sortingColumns[currentSize].index,sortingColumns[currentSize*2].index,sortingColumns[currentSize*2+1].index)
    return sortingColumns
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

    var halfSize = Math.floor((sortingColumns.length - 1)/2)

    for (let currentSize=halfSize ; currentSize>=0 ; currentSize --){
        sortingColumns = heapify(sortingColumns,currentSize)
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

        var aux = JSON.parse(JSON.stringify(sortingColumns[currentSize]))
        sortingColumns[currentSize] = JSON.parse(JSON.stringify(sortingColumns[0]))
        sortingColumns[0] = aux
        
console.log(0,sortingColumns[0],1,sortingColumns[1],2,sortingColumns[2],currentSize,sortingColumns[currentSize])
        // Then we are going to run heapify with the new node in the beginning 
        // This will automatically send the lesser elements to the back
//console.log("before",sortingColumns)
        sortingColumns = heapify(sortingColumns,0)
    }
    console.log(sortingColumns)
    setSortingColumns(sortingColumns)
}

export default function heapSort(sortingColumns,setSortingColumns) {
    const colsCopy = JSON.parse(JSON.stringify(sortingColumns))
    
    heap(colsCopy,setSortingColumns)
};
