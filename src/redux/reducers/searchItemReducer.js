const searchItemReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ITEM_SORT':
          console.log('----->SET_ITEM_SORT', action.payload)
        return action.payload;
        case 'SET_ITEM_EMPTY':
          console.log('----->SET_ITEM_EMPTY', action.payload)
        return {};
      default:
        return state;
    }
  };
  
  export default searchItemReducer;
  