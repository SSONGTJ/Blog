"use client"
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import styled from 'styled-components';

const LoginBox = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  box-shadow:0px 0px 15px 2px gray;
  padding:20px;
  border-radius:20px;
`

const marginCss = {
  margin:'15px 0'
}

const signupCss = {
  margin:'15px 0',
  width:'100%'
}

const LoginForm:React.FC = () => {
  return (
    <>
    <LoginBox>
        <h1>로그인</h1>
        <TextField id="outlined-basic" label="ID" variant="outlined" type="text" sx={marginCss}/>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <FormGroup sx={marginCss}>
        <FormControlLabel control={<Checkbox />} label="Remember Me" />
        </FormGroup>
        <Button variant="outlined" disabled>로그인</Button>
        <Link href="/signup">
        <Button variant="outlined" sx={signupCss}>회원가입</Button>
        </Link>
    </LoginBox>
    </>
  )
}

export default LoginForm;