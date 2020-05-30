const searchItemReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ITEM_SORT':
          console.log('----->set this rooms', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  export default searchItemReducer;
  