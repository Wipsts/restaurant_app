import {getUser, QUERY, authenticateLogin} from "../main"

class informationUser{
    getInformationUser(res){
        getUser(uID => {
            if(uID){
                this.getInformation(uID, Response =>{
                    res(Response)
                })
            }else{
                // not logo
            }
        })
    }

    getInformation(uID, res){
        QUERY('getEspecific', {'bd': "user", 'where': ['token', uID]}, 1, response => {
            res(response)
        })
    }

    updateInformationUser(id, name, birthday, res){
        const query = {
            "id": id,
            "data": {
                "name": name,
                "birthday": birthday,
            }
        }
        QUERY('update', {'bd': "user", 'update': query}, "null", response => {
            console.log("here")
            res(response)
        })
    }

    logoutUser(res){
        new authenticateLogin().logOut(Response =>{
            if(Response.logout){
                res(true)
            }else{
                res(false)
            }
        })
    }
}

export default informationUser