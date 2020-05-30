const boxDetailReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DETAIL':
          console.log('----->set this boxs detail', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
 
  export default boxDetailReducer;
  