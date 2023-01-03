import React from 'react'
import Button from '@mui/material/Button';


export default function TreeNode(props) {

    const value = props.value
    const xPosition = props.xPosition
    const yPosition = props.yPosition
    const index = props.index
    const head = props.head

  return ( <div>
    {head ? 
    <Button style={{position : "absolute" ,right : xPosition + "vw"  , top : yPosition + "vh" }} 
    sx={ { borderRadius: 100 , color : "purple" } } 
    size="small" 
    variant="outlined" 
    color="secondary">
        {value}
    </Button>
    :
    <div className='node' >
      <Button  style={{position : "absolute" ,right : xPosition + "vw"  , top : yPosition + "vh" }}
      onClick={()=>props.deleteTreeNode(index)}
      sx={ { borderRadius: 100 } } 
      size="small" 
      variant="outlined">
        {value}
      </Button>
    </div>}
    </div>
  )
}

