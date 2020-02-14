import axios from "axios";
import { createAction } from "redux-actions";
import { BASE_URL } from "../../../constants"
import { message } from "antd"



export const getAvlCoursesRequest = createAction('GET_AVL_COURSES_REQUEST')
export const getAvlCoursesSuccess = createAction('GET_AVL_COURSES_SUCCESS')
export const getAvlCoursesError = createAction('GET_AVL_COURSES_ERROR')

export const getEnrolledCoursesRequest = createAction('GET_ENROLLED_COURSES_REQUEST')
export const getEnrolledCoursesSuccess = createAction('GET_ENROLLED_COURSES_SUCCESS')
export const getEnrolledCoursesError = createAction('GET_ENROLLED_COURSES_ERROR')


export const getAvlCourses = () =>{
    return dispatch => {
        dispatch(getAvlCoursesRequest())
        axios.get(`${BASE_URL}/courses_not_enrolled/`)
        .then(response=>{
            
            dispatch(getAvlCoursesSuccess({data: response.data}))
        })
        .catch(e=>{
            dispatch(getAvlCoursesError())
        })
    }
}


export const getEnrolledCourses = () =>{
    return dispatch => {
        dispatch(getEnrolledCoursesRequest())
        axios.get(`${BASE_URL}/enroll_courses/`)
        .then(response=>{
            
            dispatch(getEnrolledCoursesSuccess({data: response.data}))
        })
        .catch(e=>{
            dispatch(getEnrolledCoursesError())
        })
    }
}

export const postEnrolledCoursesRequest = createAction('POST_ENROLLED_COURSES_REQUEST')
export const postEnrolledCoursesSuccess = createAction('POST_ENROLLED_COURSES_SUCCESS')
export const postEnrolledCoursesError = createAction('POST_ENROLLED_COURSES_ERROR')

export const enrolledForCourses =(courses) => {
    return dispatch => {
        dispatch(postEnrolledCoursesRequest())
        axios.post(`${BASE_URL}/enroll_courses/`, courses)
        .then(response=>{
            dispatch(getAvlCourses())
            message.success("Course Enrolled Successfully")
        })
        .catch(e=>{
            //message.error("Course Enrollment Failed")
            dispatch(postEnrolledCoursesError())

        })
    }   
}

export const patchEnrolledCoursesRequest = createAction('PATCH_ENROLLED_COURSES_REQUEST')
export const patchEnrolledCoursesSuccess = createAction('PATCH_ENROLLED_COURSES_SUCCESS')
export const patchEnrolledCoursesError = createAction('PATCH_ENROLLED_COURSES_ERROR')

export const dlistCourse =(courses) => {
    return dispatch => {
        dispatch(patchEnrolledCoursesRequest())
        axios.patch(`${BASE_URL}/enroll_courses/`, courses)
        .then(response=>{
            dispatch(getEnrolledCourses())
            message.success("Course Dlisted Successfully")
        })
        .catch(e=>{
            dispatch(patchEnrolledCoursesError())
            message.error("Course Dlisting Failed")
        })
    }   
}