import { ADD_REVIEW, DELETE_REVIEW, EDIT_REVIEW } from "../../types"

const initialState = {
    reviews: [],
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {

  case ADD_REVIEW:
    return { ...state, reviews: [action.payload, ...state.reviews] }
  case DELETE_REVIEW: 
    const updateReview = state.reviews.filter(item => item.id !== action.payload);
    return { ...state, reviews: updateReview};
  case EDIT_REVIEW:
    const reviews = state.reviews.map(elm => {
      if(elm.id === action.payload.id){
        return action.payload;
      }
      return elm
    });
    return { ...state, reviews: reviews};
  default:
    return state
  }
}

export default reviewReducer;