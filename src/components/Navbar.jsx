import React from 'react'
import Button from '@mui/material/Button';

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
            <div className="navBarItem">
              <Button variant='outlined' size="small" onClick={onlyShow} name="home">Home</Button>
            </div>
            <div className="navBarItem">
              <Button variant='outlined' size="small" onClick={onlyShow} name="sorting" className='navBarItem'>Sorting algorithms</Button>
            </div>
            <div className="navBarItem">
              <Button variant='outlined' size="small" onClick={onlyShow} name="search" className='navBarItem'>Search algorithms</Button>
            </div>
            <div className="navBarItem">
              <Button variant='outlined' size="small" onClick={onlyShow} name="other" className='navBarItem'>Other algorithms</Button>
            </div>
    </div>
  )
 }
