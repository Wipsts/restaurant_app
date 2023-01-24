import { collection, getDocs, query, where, documentId } from "firebase/firestore";

async function getData(data, db, res) {
    const dataCollectionRef = collection(db, data.bd);
    getDocs(dataCollectionRef).then(Response => {
        const dats = Response.docs.map(doc => ({data: doc.data(), id: doc.id}))
        res(dats)
    }).catch(err => {
        console.error(err.message) 
    })
}

async function getDataEspecific(data, db, res) {
    const dataCollectionRef = collection(db, data.bd);
    const r = query(dataCollectionRef, where((data.where[0] === "documentID" ? documentId() : data.where[0]), "==", data.where[1])); // format where => "state", "==", "CA"
    const querySnapshot = await getDocs(r);
    querySnapshot.forEach((doc) => {
      res({id: doc.id, data: doc.data()})
    });
}


export {getData, getDataEspecific}