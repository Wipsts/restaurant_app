import {db} from "../../server/host/init-firebase"

import {getData, getDataEspecific} from "../../server/host/function_database/getData"
import addData from "../../server/host/function_database/addData"
import updateData from "../../server/host/function_database/updateData"
import deleteData from "../../server/host/function_database/deleteData"

function query(type, data, token, res){
    /*
        data: {
            'bd': "",
            'select': "",
            'insert_data': {'name': "", 'email': ""},
            'update': {'id': "", 'data': {'name': "", 'email': ""}},
            'limit': "",
            'where': ""
        }
    */

    switch(type){
        case "get":
            getData(data, db, response => {res(response)})
        break;
        case "add":
            addData(data, db, response => {res(response)});
        break;
        case "update":
            updateData(data, db, response => {res(response)})
        break;
        case "getEspecific":
            getDataEspecific(data, db, response => {res(response)})
        break;
        default:
            deleteData(data, db, response => {res(response)})
        break;
    }


}


export default query