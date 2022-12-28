import React from 'react'

export default function ListNode(props) {

    const xPosition = props.xPosition
    const yPosition = props.yPosition
    const nextNode = props.nextNode
    const value = props.value

  return (
    <div style={{ position : "absolute" , right : xPosition + "vw" , top : yPosition + "vh" }}>
        {value}
    </div>
  )
}