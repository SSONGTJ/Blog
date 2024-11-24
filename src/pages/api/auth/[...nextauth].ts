import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // 올바른 임포트 방법
import { getUserData } from "@/services/firebaseUserService";
import { compare } from "bcryptjs";

// 타입정의
interface User {
  id: string;
  name: string;
}

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
          if (userData) {
            // 비밀번호 비교
            const isPasswordValid = await compare(password, userData.password);
            if (isPasswordValid) {
              return { id: userData.id, name: userData.name }; // 비밀번호가 맞으면 user 객체 반환
            }
          }
          return null; // 인증 실패 시 null 반환
        } catch (error) {
          console.error("로그인 실패", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/src/app/page.tsx", // 로그인 페이지 경로
  },
  session: {
    strategy: "database", // JWT 세션 방식으로 설정 (로컬 세션도 가능)
  },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user = user as User; // 타입 캐스팅
      }
      return session;
    },
  },
});
