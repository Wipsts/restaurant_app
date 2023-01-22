import { collection, addDoc} from "firebase/firestore";

async function addData(data, db, res) {
    // TODO / fazer tratamento de error (if exist data.insertdata)
    
    if(!data.insert_data){
        res(["error", "data is not valid"])
    }

    const dataCollectionRef = collection(db, data.bd);
    addDoc(dataCollectionRef, data.insert_data).then(Response => {
        res(Response.id)
    }).catch(err => {
        console.error(err.message) 
    })
}

export default addData