import { ADD_REVIEW, DELETE_REVIEW, EDIT_REVIEW } from "../../types";


export const addReview = (data) => {
    return {
        type: ADD_REVIEW,
        payload: data
    }
}

export const deleteReview = (data) => {
    return {
        type: DELETE_REVIEW,
        payload: data
    }
}

export const editReview = (data) => {
    return {
        type: EDIT_REVIEW,
        payload: data
    }
}

