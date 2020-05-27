const qrCodeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_QR_CODE':
          console.log('----->set this qr code', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default qrCodeReducer;
  