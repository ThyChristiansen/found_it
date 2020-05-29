const roomReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ROOM':
          console.log('----->set this rooms', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default roomReducer;
  