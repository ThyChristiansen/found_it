const houseNameReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_HOUSE_NAME':
          console.log('----->set this house name', action.payload)
        return action.payload;
      default:
        return state;
    }
  };

  export default houseNameReducer;
  