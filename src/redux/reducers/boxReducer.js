const boxReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BOX':
          // console.log('----->set this boxes', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  

  export default boxReducer;
  