import {QUERY, getUser} from "../main"

class getHistoric{
    get(res){
        getUser(tokenUid => {
            this.getDataUser(tokenUid, tagsIDs => {
                this.getHistoricUser(tagsIDs.idHistoric, ResponseHistoric => {
                    const pending = ResponseHistoric.data.pending
                    const historic = ResponseHistoric.data.historic
                    
                    res({pending, historic})
                })
            })
        })
    }

    getHistoricUser(idTag, res){
        // TODO Otimizar (para não fazer tantas requisoes)
        if(sessionStorage.getItem('historicData') && JSON.parse(sessionStorage.getItem('historicData'))[0]){
            const historic = JSON.parse(sessionStorage.getItem('historicData'))
            res(historic)
        }else{
            QUERY('getEspecific', {'bd': "historic", 'where': ["documentID", idTag]}, 1, response => {           
                sessionStorage.setItem('historicData', JSON.stringify(response));
                res(response)
            })
        }

    }


    getDataUser(uiD, res){    
        if(sessionStorage.getItem('tagsIdsResponseUser') && JSON.parse(sessionStorage.getItem('tagsIdsResponseUser')).idUser === uiD){
            const tags = JSON.parse(sessionStorage.getItem('tagsIdsResponseUser'))
            res(tags)
        }else{
            QUERY('getEspecific', {'bd': "user", 'where': ['token', uiD]}, 1, response => {
                console.log(response)
                const tags = {
                    "idHistoric": (response.data.idHistoric) ? response.data.idHistoric : response.data.idHstoric,
                    "idList": response.data.idList,
                    "idUser": uiD
                }
                sessionStorage.setItem('tagsIdsResponseUser', JSON.stringify(tags));
                res(response)
            })
        }
    }
}

export default getHistoric