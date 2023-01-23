import {getCookie} from './cookie';
class userLog{
    init(){
        if(getCookie("USER.LOGIN")){
            const valUserCookie = getCookie("USER.LOGIN").split("-")
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