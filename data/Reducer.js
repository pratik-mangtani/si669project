const LOAD_ITEMS = 'LOAD_ITEMS';


const initialState = {
    listItems: null,
  }

  const loadItems = (state, newListItems) => {
    return {
      ...state,
      listItems: newListItems
    }
  }


  function rootReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case LOAD_ITEMS:
        return loadItems(state, payload.newItems);
      default:
        return state;
    }
  }
  
  export {
    rootReducer,
    LOAD_ITEMS
  };