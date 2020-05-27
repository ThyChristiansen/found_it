const boxDetailReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DETAIL':
          console.log('----->set this boxs detail', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default boxDetailReducer;
  