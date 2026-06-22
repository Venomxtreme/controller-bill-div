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

const COLLECTION = "receitas";

export async function createReceita(data) {

  return addDoc(
    collection(db, COLLECTION),
    data
  );
}

export async function removeReceita(id) {

  return deleteDoc(
    doc(db, COLLECTION, id)
  );
}

export async function deleteReceita(id) {

  const receitaRef =
    doc(db, COLLECTION, id);

  await deleteDoc(receitaRef);
}

export async function updateReceita(
  id,
  data
) {

  return updateDoc(
    doc(db, COLLECTION, id),
    data
  );
}

export function getReceitas(
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

      const receitas = [];

      snapshot.forEach((docItem) => {

        receitas.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      callback(receitas);
    }
  );
}