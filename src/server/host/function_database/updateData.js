import { updateDoc, doc} from "firebase/firestore";

async function updateData(data, db, res) {
    const dataCollectionRef = doc(db, data.bd, data.update.id);
    updateDoc(dataCollectionRef, data.update.data).then(Response => {
        res(Response)
    }).catch(err => console.error(err.message))
}

export default updateData