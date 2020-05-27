const boxReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BOX':
          console.log('----->set this boxes', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default boxReducer;
  