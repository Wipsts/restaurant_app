import React, {useState, useEffect} from "react";
import { onSnapshot  } from "firebase/firestore";
import { DataCollection } from "../../lib/firestore.collections";

function AutomaticCollection(){
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const dats = onSnapshot(DataCollection, snapshot => {
            setDatas(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })

        return () => {
            dats()
        };
    }, []);

    return (
        <>
            <div>
                <h2> Test realtime database</h2>

                <ul>
                    {datas.map(dt => (
                        <li key={dt.id}>
                            {dt.id} : {dt.data.name}
                        </li>
                    ))}
                </ul>
            </div>   
        </>
    )
}

export default AutomaticCollection