import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {setCookie, QUERY} from "../main"
import registreAuthenticateWithApi from "./registre.authenticate.api.js"

class registreUser{
    registreAutheticate(form, res){
        if(form === 0){
            new registreAuthenticateWithApi().GoogleAuth(Response => {
                if(Response.registre){
                    this.createUserInUserBD(Response.user.email, Response.user.uid, Response => {
                        if(Response){
                            setCookie("USER.LOGIN", Response.token, 31)
                            res({login: true})
                        }else{
                            res({login: false})
                        }
                    })

                }else{
                    console.error(Response.why)
                }
            })
        }else if(form === 1){
            res({login: false, why: "notSupported"})
        }else{
            new registreAuthenticateWithApi().FacebookAuth(Response => {
                if(Response.registre){
                    this.createUserInUserBD(Response.user.email, Response.user.uid, Response => {
                        if(Response){
                            setCookie("USER.LOGIN", Response.token, 31)
                            res({login: true})
                        }else{
                            res({login: false})
                        }
                    })
                }else{
                    console.error(Response.why)
                }
            })
        }
    }

    registre(email, password, res){
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const localID = user.reloadUserInfo.localId // ponte da auth com o bd
          
          this.createUserInUserBD(email, localID, responseCreateUser => {
            console.log("create - 200")
          })
        
          sendEmailVerification(user)
            .then(() => {
                setCookie("registrePath", "mailVerify", 3)
                res({registre: true})
            }).catch(error => {
                console.error(error.code, error.message)
                res({registre: false, why: "email"})
            });
        })
        .catch((error) => {
            console.error(error.code, error.message)
            res({registre: false, why: "notRegistre"})
        });

    }

    createUserInUserBD(email, token, res){
        var inserDataCard = {
            cardName : "",
            numberCard : "",
            secretNumber : "",
            cvvCard : "",
            validateCard : "",
            type : "",
            flag : ""
        }
        var inserDataHistoric = {
            "pending" : {},
            "historic" : []
        }
        var inserDataList = {
            "product": [],
            "description": [],
            "totalVal": "0,00"
        }

        // reponse => id
        QUERY('add', {'bd': "historic", 'insert_data': inserDataHistoric}, "null", responseHistoric => {
            QUERY('add', {'bd': "card", 'insert_data': inserDataCard}, "null", responseCard => {
                QUERY('add', {'bd': "list", 'insert_data': inserDataList}, "null", responseList => {
                    var inserDataUser = {
                        birthday: "",
                        cpf: "",
                        email: email,
                        idCard: responseCard,
                        idHstoric: responseHistoric,
                        name: "",
                        idList: responseList,
                        token: token
                    }
                    QUERY('add', {'bd': "user", 'insert_data': inserDataUser}, "null", response => {
                        res(true)
                    })    
                })   
            })
        })
    
    }
}
export default registreUser