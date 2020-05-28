const itemReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ITEM':
          console.log('----->set this item', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default itemReducer;
  