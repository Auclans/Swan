var timeout1;
var timeout2;
var timeout3;
var timeout4;

function linearSearchAnimation(column,shift,setSearchColumns){
    timeout1 = setTimeout(()=>{
        setSearchColumns(prev => {
            var newColumns = JSON.parse(JSON.stringify(prev))
            newColumns[column].color = "#C147E9"
            return newColumns
        })
    },shift)
    timeout2 = setTimeout(()=>{
        setSearchColumns(prev => {
            var newColumns = JSON.parse(JSON.stringify(prev))
            newColumns[column].color = "#A6F1F5"
            return newColumns
        })
    },shift+50)
}

function foundAnimation(column,shift,setSearchColumns){
    timeout3 = setTimeout(()=>{
        setSearchColumns(prev => {
            var newColumns = JSON.parse(JSON.stringify(prev))
            newColumns[column].color = "#FFE600"
            return newColumns
        })
    },shift+51)
}

var shift = 0
var showNotFound = true

export default function linearSearch(numberToSearch,searchColumns,setSearchColumns) {

    numberToSearch = Number(numberToSearch)

    // We'll restart the animations
    clearTimeout(timeout1)
    clearTimeout(timeout2)
    clearTimeout(timeout3)
    clearTimeout(timeout4)

  // First we'll restart previous columns colors

  setSearchColumns(prev=>{
    var resetedColors = JSON.parse(JSON.stringify(prev))
    for (let i=0; i<resetedColors.length ; i++){
        resetedColors[i].color = "#A6F1F5"
    }
    return resetedColors
  })

  // Linear search is just a for loop
    for ( let i=0; i<searchColumns.length ; i++){
        shift += 100
        linearSearchAnimation(i,shift,setSearchColumns)
        if (searchColumns[i].value === numberToSearch){
            foundAnimation(i,shift,setSearchColumns);
            showNotFound = false
            break;
        }
    }

    // We'll indicate if the number to search wasn`t found
    if (showNotFound){
        timeout4 = setTimeout(()=>{
            alert("The number you introduced wasn`t found !")
        },shift)
    }

    // We also have to restart the shift variable to run more times immediately
    shift = 0

}
