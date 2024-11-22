import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { hashPassword } from "./hashPassword";

export const signUp = async (userData:{name:string; id:string; password:string}) => {
    try {
        const hashedPassword = await hashPassword(userData.password);
        
        const docRef = await addDoc(collection(db, "Users"), {
            name:userData.name,
            id:userData.id,
            password:hashedPassword,
            createdAt:new Date(),
        });
        console.log("회원가입 ㅊㅋ", docRef.id);
    } catch(error){
        console.log("회원가입 실패", error);
    }
}