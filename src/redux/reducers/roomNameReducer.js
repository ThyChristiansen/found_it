const roomNameReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ROOM_NAME':
          console.log('---------> send this room name to client', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default roomNameReducer;
  