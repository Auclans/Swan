import React from 'react'
import OtherAlgorithms from './OtherAlgorithms'
import SearchAlgorithms from './SearchAlgorithms'
import SortingAlgorithms from './SortingAlgorithms'
import Home from './Home'

export default function Instructions(props) {

  var showSorting = props.showSorting
  var showSearch = props.showSearch
  var showOther = props.showOther

  return (
    <div className='content'>
        {showSorting ? <SortingAlgorithms/> : 
        showSearch ? <SearchAlgorithms/> :
        showOther ? <OtherAlgorithms/> 
        : <Home/> }
    </div>
  )
}
