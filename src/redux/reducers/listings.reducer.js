const listingReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LISTINGS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default listingReducer;
  