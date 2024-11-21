'use client'
import { signUp } from "@/services/firebaseUserService";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    padding:20px
`

export default function Page() {
    const [name,setName] = useState('');
    const [id, setId] = useState('');
    const [password,setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect (()=>{
        if(name !=='' && id !== '' && password !== ''){
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    },[name,id,password]);

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        await signUp({name,id,password});
        setName('');
        setId('');
        setPassword('');
    }

    return (
        
            <form onSubmit={handleSubmit}>
                <Wrap>

            <h1>회원가입</h1>
            <TextField id="standard-basic" label="이름" variant="standard" type="text" value={name} onChange={(e)=>(setName(e.target.value))}/>
            <TextField id="standard-basic" label="ID" variant="standard" type="text" value={id} onChange={(e)=>{setId(e.target.value)}}/>
            <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
            />
            <Button variant="outlined" disabled={!isFormValid} style={{marginTop:'20px'}} type="submit">회원가입</Button>
                </Wrap>

            </form>
        
    );
}