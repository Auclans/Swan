import React from 'react'

export default function Columns(props) {

  const column = props.column
  const color = props.color

  return (
    <div style={{height : column , backgroundColor : color ,border: '1px solid black'}} className="column">
    </div>
  )
}