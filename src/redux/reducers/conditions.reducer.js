const conditionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONDITIONS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default conditionReducer;
  