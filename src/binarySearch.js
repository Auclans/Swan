
// What makes the log n time is working with half the size
// in each iteraction !!!

function animateRegion(start,end,setBinaryColumns,shift){
    setTimeout(()=>{
        setBinaryColumns(prev=>{
            var binaryColumns = JSON.parse(JSON.stringify(prev))
            for (let i=0; i<binaryColumns.length;i++){
                if (i>start && i<end){
                    binaryColumns[i].color = "#C147E9"
                }
            }
            return binaryColumns
        })
    },shift)

    setTimeout(()=>{
        setBinaryColumns(prev=>{
            var binaryColumns = JSON.parse(JSON.stringify(prev))
            for (let i=0; i<binaryColumns.length;i++){
                if (i>start && i<end){
                    binaryColumns[i].color = "#A6F1F5"
                }
            }
            return binaryColumns
        })
    },shift+400)
}

function animateFound(middle,setBinaryColumns,shift){
    setTimeout(()=>{
        setBinaryColumns(prev=>{
            var binaryColumns = JSON.parse(JSON.stringify(prev))
            binaryColumns[middle].color = "#FFE600"
            return binaryColumns
        })
    },shift+1)
}

var shift = 0

function recursiveBinarySearch(low,high,numberToSearch,binaryColumns,setBinaryColumns){
    shift += 200

    var middle = low + Math.round((high-low)/2)

    if (numberToSearch === binaryColumns[middle].value){
        animateFound(middle,setBinaryColumns,shift)
        return binaryColumns;
    }

    if (numberToSearch > binaryColumns[middle].value && binaryColumns[middle].value!==numberToSearch){
        animateRegion(middle,high,setBinaryColumns,shift)
        recursiveBinarySearch(middle,high,numberToSearch,binaryColumns,setBinaryColumns)
    }else if(numberToSearch < binaryColumns[middle].value && binaryColumns[middle].value!==numberToSearch){
        animateRegion(low,middle,setBinaryColumns,shift)
        recursiveBinarySearch(low,middle,numberToSearch,binaryColumns,setBinaryColumns)
    }
}

export default function binarySearch(numberToSearch,binaryColumns,setBinaryColumns) {
    const copyBinaryColumns = JSON.parse(JSON.stringify(binaryColumns))
    numberToSearch = Number(numberToSearch)
    const low = 0
    const high = binaryColumns.length-1
    recursiveBinarySearch(low,high,numberToSearch,copyBinaryColumns,setBinaryColumns)


}
