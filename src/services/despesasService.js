import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

const COLLECTION = "despesas";

export async function createDespesa(data) {

  return addDoc(
    collection(db, COLLECTION),
    data
  );
}

export async function removeDespesa(id) {

  return deleteDoc(
    doc(db, COLLECTION, id)
  );
}

export async function deleteDespesa(id) {

  const despesaRef =
    doc(db, COLLECTION, id);

  await deleteDoc(despesaRef);
}

export async function updateDespesa(
  id,
  data
) {

  return updateDoc(
    doc(db, COLLECTION, id),
    data
  );
}

export function getDespesas(
  userId,
  callback
) {

  const q = query(
    collection(db, COLLECTION),

    where(
      "userId",
      "==",
      userId
    )
  );

  return onSnapshot(
    q,
    (snapshot) => {

      const despesas = [];

      snapshot.forEach((docItem) => {

        despesas.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      callback(despesas);
    }
  );
}