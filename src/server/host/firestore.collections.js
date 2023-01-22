import { collection } from "firebase/firestore";
import { db } from "./init-firebase";

// para pegar apenas o banco "user"
export const DataCollection = collection(db, "user")