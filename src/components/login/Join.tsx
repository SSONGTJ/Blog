import { TextField } from '@mui/material'
import React from 'react'

const Join:React.FC = () => {
  return (
    <div>
        <h1>회원가입</h1>
        <TextField id="outlined-basic" label="ID" variant="outlined" type="text"/>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
    </div>

  )
}

export default Join