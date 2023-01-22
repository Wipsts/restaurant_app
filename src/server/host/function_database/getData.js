import { collection, getDocs} from "firebase/firestore";

async function getData(data, db, res) {
    const dataCollectionRef = collection(db, data.bd);
    getDocs(dataCollectionRef).then(Response => {
        const dats = Response.docs.map(doc => ({data: doc.data(), id: doc.id}))
        res(dats)
    }).catch(err => {
        console.error(err.message) 
    })
}

export default getData