import { initializeApp, getApps } from 'firebase/app';

import {
    getFirestore, collection, getDocs,
    doc, getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore';

import { firebaseConfig } from '../Secret';
import {  LOAD_ITEMS, LOAD_USERS } from '../data/Reducer';

let app, db = undefined;
const COLLNAME = 'furnitureCollection';


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
    const querySnap = await getDocs(collection(db, 'users'));
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

const saveAndDispatch = async (action, dispatch) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_ITEMS:
            loadItemsAndDispatch(action, dispatch);
            return;
        case LOAD_USERS:
            loadUsersAndDispatch(action, dispatch);
            return;
        default:
            return;
    }
}

export { saveAndDispatch };


