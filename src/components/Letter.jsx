import React from 'react'

export default function Letter(props) {
    const letter = props.value
    const color = props.color

  return (
    <div className='letters' style={{color : color}}>{letter}</div>
  )
}
