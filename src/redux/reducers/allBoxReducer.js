const allBoxReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_BOX':
          // console.log('----->set all box', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  

  export default allBoxReducer;
  