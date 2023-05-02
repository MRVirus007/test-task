import { db } from "./firebase";
import { collection, addDoc, getDoc } from "firebase/firestore";

export const addUserToFirestore = async (user) => {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("User added to Firestore with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding user to Firestore: ", error);
    }
};

export const getUsersList = async () => {
    try {
        const snapshot = await db.collection('users').get();
        const fetchedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return fetchedUsers;
    } catch (error) {
        console.error("Error getting user from Firestore: ", error);
    }
};