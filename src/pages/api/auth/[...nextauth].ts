import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // 올바른 임포트 방법
import { getUserData } from "@/services/firebaseUserService";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { id, password } = credentials!;
        try {
          // 유저 데이터 가져오기
          const userData = await getUserData(id);

          if (!userData) {
            throw new Error("존재하지 않는 사용자입니다.");
          }

          // 비밀번호 비교
          const isPasswordValid = await compare(password, userData.password);
          if (isPasswordValid) {
            return { id: userData.id, name: userData.name }; // 비밀번호가 맞으면 user 객체 반환
          } else {
            throw new Error("비밀번호가 틀렸습니다.");
          }
        } catch (error) {
          console.error("로그인 실패", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // JWT 세션 방식으로 설정 (로컬 세션도 가능)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // 타입 캐스팅
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, name: token.name };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
