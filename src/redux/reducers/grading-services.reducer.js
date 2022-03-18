const gradingServiceReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GRADING_SERVICES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default gradingServiceReducer;
  