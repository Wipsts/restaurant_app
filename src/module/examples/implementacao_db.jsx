import React, {useState} from "react";
import { QUERY }from "../main.js"
// import ComponentExample from "./realtimeData_example"

import "../../style/min/index.scss";

function Index(props){
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    function callGet(){
        QUERY('get', {'bd': "user", 'select': ""}, "null", response => {
            console.log(response)
        })
    }

    function callUpdate(e){
        e.preventDefault()
        if(name === "" || id === ""){
            return 
        }

        var updateData = {'id': id, 'data': { 'name': name }}
        QUERY('update', {'bd': "user", 'update': updateData}, "null", response => {
            console.log(response)
        })
    }

    function callInsert(e){
        e.preventDefault()
        if(email === ""){
            return 
        }

        var inserDataUser = {
            "birthday": "",
            "cpf": "",
            "email": email,
            "idCard": "",
            "idHstoric": "",
            "name": "",
            "token": "j108su10190si19"
        }
        QUERY('add', {'bd': "user", 'insert_data': inserDataUser}, "null", response => {
            console.log("here")
            console.log(response)
        })
    }

    return (
        <>
            <button onClick={()=>callGet()}>select User</button>

            <form onSubmit={callUpdate}>
                <span>ID</span>
                <input type="text" id="id" value={id} onChange={e => setID(e.target.value)}/>
                <span>Name</span>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
                
                <button type="submit">Update User</button>
            </form>

            <form onSubmit={callInsert}>
                <span>Email</span>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <span>Name</span>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
                
                <button type="submit">Insert User</button>
            </form>



            {/* <ComponentExample/> */}
        </>
    )
}

export default Index