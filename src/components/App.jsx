import React from "react"
import Navbar from "./Navbar.jsx"
import Content from "./Content.jsx";

function App() {

  // Navbar must be unmutable div
  // Instructions must be a constant size 
  // that will show some content or another 
  // based on the actual page , which will 
  // be deduce using states for each algo !!
  // It will be full of states !

  var [showSorting,setShowSorting] = React.useState(false)
  var [showSearch, setShowSearch] = React.useState(false)
  var [showOther, setShowOther] = React.useState(false)
  
  return (
    <div>
      <Navbar 
        setShowSorting = {setShowSorting}
        setShowSearch = {setShowSearch}
        setShowOther = {setShowOther}
      />
      <Content 
        showSorting = {showSorting}
        showSearch = {showSearch}
        showOther = {showOther}
      />
    </div>
  );
}

export default App;
