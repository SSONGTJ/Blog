import {
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { hashPassword } from "./hashPassword";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

// 회원가입 api
export const signUp = async (userData: {
  name: string;
  id: string;
  password: string;
}) => {
  try {
    const hashedPassword = await hashPassword(userData.password);

    const docRef = await addDoc(collection(db, "Users"), {
      name: userData.name,
      id: userData.id,
      password: hashedPassword,
      createdAt: new Date(),
    });
    console.log("회원가입 ㅊㅋ", docRef.id);
  } catch (error) {
    console.log("회원가입 실패", error);
  }
};

// All User Data GET API
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  } catch (error) {
    console.error("유저데이터 가져오기 실패");
  }
};

// Id를 조회해서 단일 데이터 가져오기
export const getUserData = async (id: string) => {
  try {
    const q = query(collection(db, "Users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data();
    } else {
      throw new Error("id가 잘못 됨");
    }
  } catch (error) {
    console.error("ERror", error);
  }
};

// 로그인 api
export const login = async (id: string, password: string): Promise<any> => {
  try {
    // 유저 데이터를 가져온다.
    const userData = await getUserData(id);
    // 비밀번호 비교해보기
    const isPasswordValid = await compare(password, userData.password);

    if (isPasswordValid) {
      const secret = process.env.JWT_SECRET!;
      const token = jwt.sign({ id: userData.id }, secret, { expiresIn: "1h" });
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
      console.log("로그인 성공");
      return { status: 200, token };
    } else {
      throw new Error("비밀번호가 일치하지 않음!");
    }
  } catch (error) {
    console.error("로그인 실패 (fb service)", error);
    throw error;
  }
};
