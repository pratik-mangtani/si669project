const LOAD_ITEMS = 'LOAD_ITEMS';
const LOAD_USERS = 'LOAD_USERS';
const UPDATE_USER = 'UPDATE_USER';



const initialState = {
  listItems: null,
  users: null,
}

const loadItems = (state, newListItems) => {
  return {
    ...state,
    listItems: newListItems
  }
}

const loadUsers = (state, newUsers) => {
  return {
    ...state,
    users: newUsers
  }
}


const updateUser = (state, userId, displayName, favorites) => {
  let { users } = state;
  let newUser = {
    key: userId,
    displayName: displayName,
    favorites: favorites

  };
  let newUsers = users.map(elem => elem.key === userId ? newUser : elem);
  return {
    ...state,
    users: newUsers
  };
}



function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ITEMS:
      return loadItems(state, payload.newItems);
    case LOAD_USERS:
        return loadUsers(state, payload.newUsers);
    case UPDATE_USER:
      return updateUser(state, payload.key, payload.displayName, payload.favorites);
    default:
      return state;
  }
}

export {
  rootReducer,
  LOAD_ITEMS, LOAD_USERS, UPDATE_USER
};