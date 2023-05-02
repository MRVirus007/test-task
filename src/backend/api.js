import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addUserToFirestore = async (user) => {
    try {
        await addDoc(collection(db, "users"), user);
    } catch (error) {
        console.error("Error adding user to Firestore: ", error);
    }
};

export const getUsersList = async () => {
    try {
        const data = await getDocs(collection(db, "users"));
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return users;
    } catch (error) {
        console.error('Error fetching users from database: ', error);
    }
};