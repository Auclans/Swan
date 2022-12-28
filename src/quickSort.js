
function recursiveQuickSort(sortingColumns,setColumns){

    // Turn around point that will collect be collected in left/right list
    // What stops the split and begins the merge
    if (sortingColumns.length <= 1){return sortingColumns}

    // Select as pivot the first element of the recursive array
    var pivot = sortingColumns[0]

    var leftList = []
    var rightList = []

    // Quicksort algo selects a pivot compares the rest of the array elements
    // with the pivot , placing them to the right if they are greater and to 
    // to the left if they are lesser .This can directly be implemented using
    // two lists and concatenating them with the pivot 
    for (let i=1;i<sortingColumns.length;i++){
        if (sortingColumns[i].value < pivot.value){
            leftList.push(sortingColumns[i])
        }else if (sortingColumns[i].value >= pivot.value){
            rightList.push(sortingColumns[i])
        }
    }

    leftList = recursiveQuickSort(leftList,setColumns)
    // Δ1 that will be added to the call stack --------------------------------------
    rightList = recursiveQuickSort(rightList,setColumns)
    // Δ2 that will be added to the call stack --------------------------------------

    // Its important to note that since the right part wasnt added in the first run to the 
    // call stack , it will rerun every time a Δ1 pops from the call stack creating a Δ2
    // that first will have to resolve deeply to merge with the initial Δ1 .This will repeat for every Δ1

    // Getting here means that both from Δ1 or Δ2 ,two parts at same level ready to merge,
    // because either they are the bottom or they reconstructed it bottom up

    // The 2 same level parts are concatenated with the pivot because they were already
    // sorted .The main difference to mergesort is that sortion happens before recursion

    // The reason why this method is called bottom up , is that the code doesnt although is 
    // traversed up->down, it doesnt resolve until the down allows it to happen ,and this 
    // is possible through this return , because parent call stack calls will collect it
    // in left/right list and use it as new input to solve the problem bottom up !

    return leftList.concat(pivot,rightList)
}

export default function quickSort(sortingColumns,setColumns){
    const colsCopy = JSON.parse(JSON.stringify(sortingColumns))
    const res = recursiveQuickSort(colsCopy,setColumns)
    console.log(res)
}
