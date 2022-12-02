const LOAD_ITEMS = 'LOAD_ITEMS';
const LOAD_USERS = 'LOAD_USERS';


const initialState = {
    listItems: null,
    users: null
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


  function rootReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case LOAD_ITEMS:
        return loadItems(state, payload.newItems);
      case LOAD_USERS:
        return loadUsers(state, payload.newUsers);
      default:
        return state;
    }
  }
  
  export {
    rootReducer,
    LOAD_USERS,
    LOAD_ITEMS
  };