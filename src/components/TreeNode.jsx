import React from 'react'

export default function TreeNode(props) {

    const value = props.value
    const height = props.height
    const xPosition = props.xPosition
    const yPosition = props.yPosition
    const index = props.index

    // X POSITION MUST DEPEND ON HEIGHT 

    // Yposition must be stored and will be displayed as height
    // xposition must be stored and will be displayed as width ,
    // it also must start shifted for each new height !! also add scroll
    // add rotate to arrow based on height and limit to a maximum 
    // if it causes problems , around 6 or 7
    // add matrix indexing to identify node !
// xPosition/height + "vw" 

  return (
    <button style={{position : "absolute" ,right : xPosition + "vw"  , top : yPosition + "vh" }} onClick={()=>props.deleteTreeNode(index)}>
        {value}
    </button>
  )
}

