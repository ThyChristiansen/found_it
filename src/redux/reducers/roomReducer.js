const roomReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ROOM':
          // console.log('----->set this rooms', action.payload)
        return action.payload;
      default:
        return state;
    }
  };

  export default roomReducer;
  