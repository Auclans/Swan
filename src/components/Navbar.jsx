import React from 'react'

export default function Navbar(props) {

    var setShowSorting = props.setShowSorting
    var setShowSearch = props.setShowSearch
    var setShowOther = props.setShowOther

    function onlyShow(event){
      const buttonPressed = event.target.name

      setShowSorting(false)
      setShowSearch(false)
      setShowOther(false)

      if (buttonPressed === "sorting"){
        setShowSorting(true)
      }else if (buttonPressed === "search"){
        setShowSearch(true)
      }else if (buttonPressed === "other"){
        setShowOther(true)
    }
  }

  return (
    <div className='navBar'>
            <button onClick={onlyShow} name="home" className='navBarItem'>Home</button>
            <button onClick={onlyShow} name="sorting" className='navBarItem'>Sorting algorithms</button>
            <button onClick={onlyShow} name="search" className='navBarItem'>Search algorithms</button>
            <button onClick={onlyShow} name="other" className='navBarItem'>Other algorithms</button>
    </div>
  )
 }
