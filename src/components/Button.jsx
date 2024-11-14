import React from 'react'
import { Button} from 'react-bootstrap'

const ClickButton = ({btnLabel, onClick,className}) => {
  return (
    <div>
        <Button onClick={onClick} className={className}>{btnLabel}</Button>
    </div>
  )
}

export default ClickButton