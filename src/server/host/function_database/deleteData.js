import { doc, deleteDoc} from "firebase/firestore";

async function updateData(data, db, res) {
    const dataCollectionRef = doc(db, data.bd, data.update.id);
    deleteDoc(dataCollectionRef)
        .then(Response => {res(true)})
        .catch(err => console.error(err.message), res(false))
}

export default updateData