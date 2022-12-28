
function linearSearchAnimation(column,shift,setSearchColumns){
    setTimeout(()=>{
        setSearchColumns(prev => {
            var newColumns = JSON.parse(JSON.stringify(prev))
            newColumns[column].color = "purple"
            return newColumns
        })
    },shift)
    setTimeout(()=>{
        setSearchColumns(prev => {
            var newColumns = JSON.parse(JSON.stringify(prev))
            newColumns[column].color = "lightblue"
            return newColumns
        })
    },shift+50)
}

function foundAnimation(column,shift,setSearchColumns){
    setTimeout(()=>{
        setSearchColumns(prev => {
            var newColumns = JSON.parse(JSON.stringify(prev))
            newColumns[column].color = "yellow"
            return newColumns
        })
    },shift+51)
}

var shift = 0
var showNotFound = true

export default function linearSearch(numberToSearch,searchColumns,setSearchColumns) {
  numberToSearch = Number(numberToSearch)

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
        setTimeout(()=>{
            alert("The number you introduced wasn`t found !")
        },shift)
    }
    
}
