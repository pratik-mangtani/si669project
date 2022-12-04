import { initializeApp, getApps } from 'firebase/app';

import {
    getFirestore, collection, getDocs,
    doc, getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore';

import { firebaseConfig } from '../Secret';
import { LOAD_ITEMS } from '../data/Reducer';
import { LOAD_USERS } from '../data/Reducer';
import { UPDATE_USER } from '../data/Reducer';

let app, db = undefined;
const COLLNAME = 'furnitureCollection';
const COLLNAME2 = 'users'


if (getApps().length < 1) {
    app = initializeApp(firebaseConfig);
}
db = getFirestore(app);

const loadItemsAndDispatch = async (action, dispatch) => {
    const querySnap = await getDocs(collection(db, COLLNAME));
    let newItems = [];
    querySnap.forEach(docSnap => {
        let newItem = docSnap.data();
        newItem.key = docSnap.id;
        newItems.push(newItem);
    });
    let newAction = {
        ...action,
        payload: { newItems }
    };
    dispatch(newAction);
}

const loadUsersAndDispatch = async (action, dispatch) => {
    const querySnap = await getDocs(collection(db, COLLNAME2));
    let newUsers = [];
    querySnap.forEach(docSnap => {
        let newUser = docSnap.data();
        newUser.key = docSnap.id;
        newUsers.push(newUser);
    });
    let newAction = {
        ...action,
        payload: { newUsers }
    };
    dispatch(newAction);
}

const updateUserAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    console.log(payload,"db.js")
    const { key, displayName, favorites, cart} = payload;
    const docToUpdate = doc(collection(db, COLLNAME2), key);
    await updateDoc(docToUpdate, {
        displayName: displayName,
       favorites: favorites,
       cart: cart

    });
    dispatch(action);

}

const saveAndDispatch = async (action, dispatch) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_ITEMS:
            loadItemsAndDispatch(action, dispatch);
            return;
        case LOAD_USERS:
            loadUsersAndDispatch(action, dispatch);
            return;
        case UPDATE_USER:
            updateUserAndDispatch(action, dispatch);
            return;
        default:
            return;
    }
}

export { saveAndDispatch };


