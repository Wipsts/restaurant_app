import {getCookie} from './cookie';

class userLog{
    init(){
        if(getCookie("user.login")){
            const valUserCookie = getCookie("user.login").split("-")
            if(valUserCookie[0] && valUserCookie[1]){ // userId && token
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