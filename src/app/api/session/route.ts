import { NextResponse } from "next/server";
import { login } from "@/services/firebaseUserService"; // login 함수 가져오기

export async function POST(request: Request) {
  try {
    // 요청에서 id와 password를 가져오기
    const { id, password } = await request.json();

    // login API 호출
    const loginResponse = await login(id, password);

    // 로그인 성공 시
    if (loginResponse.status === 200) {
      // 성공 응답 반환 (token 포함)
      return NextResponse.json(
        { message: "로그인 성공", token: loginResponse.token },
        { status: 200 },
      );
    } else {
      // 비밀번호가 틀린 경우 등
      return NextResponse.json({ message: "로그인 실패" }, { status: 400 });
    }
  } catch (error) {
    console.error("로그인 처리 중 에러 발생:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
