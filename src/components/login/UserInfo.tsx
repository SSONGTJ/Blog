"use client";
import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import LoginForm from "./LoginForm";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };
  return <Button onClick={handleLogout}>로그아웃</Button>;
};

const UserInfo = () => {
  const { data: session } = useSession();
  if (!session) {
    return <LoginForm />;
  }
  return (
    <div>
      <p>사용자 : {session.user.name}</p>
      <LogoutButton />
    </div>
  );
};
export default UserInfo;
