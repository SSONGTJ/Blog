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
  } catch (error: any) {
    console.error("ERror", error);
    throw new Error("getUserData 실행 오류");
  }
};
