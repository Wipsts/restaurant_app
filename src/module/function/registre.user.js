import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {setCookie, QUERY} from "../main"

class registreUser{
    // constructor(){
    // }

    registreAutheticate(form){
        // TODO registre with autheticate
    }

    registre(email, password, res){
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const localID = user.reloadUserInfo.localId // ponte da auth com o bd
          
          createUserInUserBD(email, localID, responseCreateUser => {
            console.log("create - 200")
          })
        
          sendEmailVerification(user)
            .then(() => {
                setCookie("registrePath", "mailVerify", 31)
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

        function createUserInUserBD(email, token, res){
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

    sendEmail(email, res){
        // sendEmailVerification(user)
        // .then(() => {
        //     res({send: true})
        // }).catch(error => {
        //     console.error(error.code, error.message)
        //     res({send: false})
        // });
        res({send: false})
    }
}
export default registreUser