import {getCookie} from './cookie';
class userLog{
    // TODO modificar para atenticação com firebase
    init(){
        if(getCookie("USER.LOGIN")){
            // TODO autenticação com o firebase/auth
            const valUserCookie = getCookie("USER.LOGIN")
            if(valUserCookie){
                return true
            }else{
                return false
            }
        }else{
            return false;
        }
    }
}

export default userLog