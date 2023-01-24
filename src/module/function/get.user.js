import { getAuth, onAuthStateChanged } from "firebase/auth";

function getUser(res){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        res(uid)
      } else {
        res(false)
      }
    });
}

export default getUser