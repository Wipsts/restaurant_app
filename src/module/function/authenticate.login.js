import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {setCookie} from "../main"
import loginAuthenticateWithApi from "./login.authenticate.api"
class authenticateLogin{
    loginWithAuthenticate(authenticate, res){
        if(authenticate === 0){
            new loginAuthenticateWithApi().GoogleAuth(Response => {
                if(Response.login){
                    setCookie("USER.LOGIN", Response.token, 31)
                    res({login: true})
                }else{
                    console.error(Response.why)
                }
            })
        }else if(authenticate === 1){
            res({login: false, why: "notSupported"})
        }else{
            new loginAuthenticateWithApi().FacebookAuth(Response => {
                if(Response.login){
                    setCookie("USER.LOGIN", Response.token, 31)
                    res({login: true})
                }else{
                    console.error(Response.why)
                }
            })
        }
    }

    logUser(email, password, res){        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const emailVerify = user.emailVerified
            const tokenAccess = user.accessToken
            const localID = user.reloadUserInfo.localId // ponte da auth com o bd
            const informationUser = `${localID}=${tokenAccess}`

            if(emailVerify){
                setCookie("USER.LOGIN", informationUser, 31)
                res({login: true})
            }else{
                res({login: false, why: "email"})
            }
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            res({login: false, why: "notUser"})
        });        
    }

    removeValuesLinkedUser(){
        setCookie("USER.LOGIN", null, -999999)
        localStorage.removeItem("historicData");
        localStorage.removeItem("tagsIdsResponseUser");
        localStorage.removeItem("listOrderUser");
    }

    logOut(res){
        const auth = getAuth();
        signOut(auth).then(() => {
          this.removeValuesLinkedUser()
          res({logout: true})
        }).catch((error) => {
          res({logout: false, why: error.message})
        });
    }
}
export default authenticateLogin