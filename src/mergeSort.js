
function animateVisited(newColumn,setSortingColumns){
     setTimeout(()=>{
        setSortingColumns(prev => {
            var newCols = JSON.parse(JSON.stringify(prev))
            const index = newColumn.index
            const newValue = newColumn.value
            newCols[index].value = newValue
            return newCols
        })
     },shift)
}

// function animateFound(){

// }

var shift = 0

function recursiveMergeSort(sortingColumns,setSortingColumns){

    shift += 25

    // The turnaround point : Single items will be collected in left/right list
    // What stops the split and begins the merge
    if (sortingColumns.length <= 1){return sortingColumns}

    // We are going to split the recursive columns in left and right based of middle
    const middle = Math.floor(sortingColumns.length/2)

    var leftList = JSON.parse(JSON.stringify(sortingColumns.slice(0,middle)))
    var rightList = JSON.parse(JSON.stringify(sortingColumns.slice(middle)))

    // The recursion with the half splitted new lists 
    leftList = recursiveMergeSort(leftList,setSortingColumns)
    // Δ1 that will be added to the call stack --------------------------------------
    rightList = recursiveMergeSort(rightList,setSortingColumns)
    // Δ2 that will be added to the call stack --------------------------------------

    // Its important to note that since the right part wasnt added in the first run to the 
    // call stack , it will rerun every time a Δ1 pops from the call stack creating a Δ2
    // that first will have to resolve deeply to merge with the initial Δ1 .This will repeat for every Δ1

    // Reminder : Adding a function to a call stack = Saving last point and all variables value !
    // In this case this means the sublists , middle point 

    // Getting here means that both from Δ1 or Δ2 ,two parts at same level ready to merge

    var rightPointer = 0
    var leftPointer = 0
    var mergedPointer = 0

    // First we are going to use 2 pointers to build the new sorted array 
    while (rightPointer < rightList.length && leftPointer < leftList.length){
        if (rightList[rightPointer].value > leftList[leftPointer].value){
            sortingColumns[mergedPointer] = leftList[leftPointer]
            animateVisited(sortingColumns[mergedPointer],setSortingColumns)
            leftPointer += 1
            mergedPointer += 1
        }else if (rightList[rightPointer].value <= leftList[leftPointer].value){
            sortingColumns[mergedPointer] = rightList[rightPointer]
            animateVisited(sortingColumns[mergedPointer],setSortingColumns)
            rightPointer += 1
            mergedPointer += 1
        }
    }

    // Then we are just going to add resting items , which will be sorted for each list
    // because they come from recursion , so we can just add them directly 
    while (rightPointer < rightList.length){
        sortingColumns[mergedPointer] = rightList[rightPointer]
        //animateVisited(leftList[leftPointer],setSortingColumns)
        rightPointer += 1
        mergedPointer += 1
    }

    while (leftPointer < leftList.length){
        sortingColumns[mergedPointer] = leftList[leftPointer]
        //animateVisited(rightList[rightPointer],setSortingColumns)
        leftPointer += 1
        mergedPointer += 1
    }

    // Finally we have to merge the same level parts so that they are collected by 
    // the parent call where they came from, left/right list .This way it will be 
    // used both as Δ1 or Δ2 return ,to reconstruct previous solutions bottom up
    return sortingColumns

}

export default function mergeSort(sortingColumns,setSortingColumns) {
  const colsCopy = JSON.parse(JSON.stringify(sortingColumns))
  console.log(colsCopy)
  const res = recursiveMergeSort(colsCopy,setSortingColumns)
  console.log(res)
}
