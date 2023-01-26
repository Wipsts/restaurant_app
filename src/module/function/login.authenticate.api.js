import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

class createLoginApi{
    GoogleAuth(res){
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user; // user.uid            
            res({login: true, token: token})

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res({login: false, why: "error api google"})
          });
    }
    FacebookAuth(res){
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user; // user.uid    
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          res({login: true, token: accessToken})
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
          res({login: false, why: "error api facebook"})
        });
    }
    AppleAuth(res){
      res({login: false, why: "api not configured"})
    }
}

export default createLoginApi