import React from 'react'

export default function TreeNode(props) {

    const value = props.value
    const xPosition = props.xPosition
    const yPosition = props.yPosition
    const index = props.index
    const head = props.head

  return (
    head ? 
    <div style={{position : "absolute" ,right : xPosition + "vw"  , top : yPosition + "vh" }}>
        {value}
    </div>
    :
    <button style={{position : "absolute" ,right : xPosition + "vw"  , top : yPosition + "vh" }} onClick={()=>props.deleteTreeNode(index)}>
        {value}
    </button>
  )
}

