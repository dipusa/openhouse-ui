import { handleActions } from "redux-actions";

const userDetails = {
    authStatus: -1,
}

const reducer = handleActions(
    {
        CHECK_LOGIN: (state, action) => {
            return {
                ...state,
                authStatus: action.payload
            }
        }

    },
    userDetails
);
export default reducer