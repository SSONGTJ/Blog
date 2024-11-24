"use client";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0px 0px 15px 2px gray;
  padding: 20px;
  border-radius: 20px;
`;

const marginCss = {
  margin: "15px 0",
};

const signupCss = {
  margin: "15px 0",
  width: "100%",
};

const LoginForm: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id !== "" && password !== "") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [id, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      id,
      password,
    });
    console.log(res);
    if (res?.ok) {
      console.log("로그인 성공");
      router.push("/");
    } else {
      console.error("로그인 실패", res?.error);
      alert("로그인 실패");
    }
  };

  return (
    <>
      <LoginBox>
        <h1>로그인</h1>
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          type="text"
          sx={marginCss}
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <FormGroup sx={marginCss}>
          <FormControlLabel control={<Checkbox />} label="Remember Me" />
        </FormGroup>
        <Button
          variant="outlined"
          disabled={!isLogin}
          type="submit"
          onClick={handleLogin}
        >
          로그인
        </Button>
        <Link href="/signup">
          <Button variant="outlined" sx={signupCss}>
            회원가입
          </Button>
        </Link>
        {/* <Button onClick={getUserData}>데이터 가져오기</Button> */}
      </LoginBox>
    </>
  );
};

export default LoginForm;
