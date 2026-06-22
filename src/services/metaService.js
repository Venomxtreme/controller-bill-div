import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function saveMeta(
  userId,
  valor
) {
  await setDoc(
    doc(
      db,
      "metas",
      userId
    ),
    {
      valor,
    }
  );
}

export async function loadMeta(
  userId
) {
  const snapshot =
    await getDoc(
      doc(
        db,
        "metas",
        userId
      )
    );

  if (snapshot.exists()) {
    return snapshot.data().valor;
  }

  return 2000;
}