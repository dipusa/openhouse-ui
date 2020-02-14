import { handleActions } from "redux-actions";
import { API_STATUS } from "../../../constants";

const userDetails = {
    avlcourseApi: -1,
    avlCourses: [],
    enrolledCourses: [],
    enrolledcourseApi: -1
}

const reducer = handleActions(
    {
        GET_AVL_COURSES_REQUEST: (state) => {
            return {
                ...state,
                avlcourseApi: API_STATUS.initiated,
                //avlCourses: []
            }
        },
        GET_AVL_COURSES_SUCCESS: (state, action) => {
            return {
                ...state,
                avlcourseApi: API_STATUS.success,
                avlCourses: action.payload.data
            }
        },
        GET_AVL_COURSES_ERROR: (state) => {
            return {
                ...state,
                avlcourseApi: API_STATUS.error,
                avlCourses: []
            }
        },
        GET_ENROLLED_COURSES_REQUEST: (state) => {
            return {
                ...state,
                enrolledcourseApi: API_STATUS.initiated,
                //enrolledCourses: []
            }
        },
        GET_ENROLLED_COURSES_SUCCESS: (state, action) => {
            return {
                ...state,
                enrolledcourseApi: API_STATUS.success,
                enrolledCourses: action.payload.data
            }
        },
        GET_ENROLLED_COURSES_ERROR: (state) => {
            return {
                ...state,
                enrolledcourseApi: API_STATUS.error,
                enrolledCourses: []
            }
        }

    },
    userDetails
);
export default reducer