import {getUser} from '../main';
class userLog{
    init(res){   
        getUser(Response => {
            if(Response){
                res(true)
            }else{
                res(false)
            }
        })     
    }
}

export default userLog