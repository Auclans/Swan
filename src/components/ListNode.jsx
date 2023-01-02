import React from 'react'
import { BsArrowUpRight,BsArrowDownRight } from "react-icons/bs";
import Button from '@mui/material/Button';

export default function ListNode(props) {

    const xPosition = props.xPosition
    const yPosition = props.yPosition
    const value = props.value
    const start = props.start

    const booleanYPositionUp = props.booleanYPositionUp
    const nextNode = props.nextNode
    const index = props.index

    // Once we took the properties of each node , we are 
    // going to use position absolute to draw them , that
    // way we will use the same reference system for every
    // node and we are just going to introduce a shift between them
    // Also we will check if its start : if it is we wont allow
    // the deletion of a node to avoid crashing , and if it isnt
    // it will show a button that if pressed will delete the node 
    // using the function in linkedListContent

  return (<div>
      <div style={{ position : "absolute" , 
      right : xPosition + "vw" , 
      top : yPosition + "vh" }} >
        {
        start ? <Button sx={ { borderRadius: 100 } } size="small" variant="outlined" color="secondary">{value}</Button> 
        : 
        <div >
          <Button sx={ { borderRadius: 100 } } size="small" variant="outlined" onClick={()=>props.deleteNode(index)} className="button">{value}</Button>
        </div>
        }
      </div>

      <div>
        { 
        // We'll draw the arrows also using the corrdinates of each node as starting point
        // We'll need to add some shifts to make everything match visually
        // Also we'll cover the case where next node is null (the last node)
        ! nextNode ? 
        null 
        :
        booleanYPositionUp ? 
        <BsArrowDownRight style={{ position : "absolute",
        right : xPosition - 5 + "vw" , 
        top : yPosition + 4 + "vh",
        height : "5.5vh" ,
        width : "9vw",
        color : "#A6F1F5"
        }}/>
        :
        <BsArrowUpRight style={{ position : "absolute",
        right : xPosition - 4.25 + "vw" , 
        top : yPosition - 6 + "vh",
        height : "5.5vh" ,
        width : "9vw",
        color : "#A6F1F5" }}/>
        }
      </div>
    </div>
  )
} 