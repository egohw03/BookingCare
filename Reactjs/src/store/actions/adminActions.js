import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUser, getAllUsers, deleteUser as deleteUserApi, updateUserData as updateUserApi } from "../../services/userService";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error:', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error:', e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error:', e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const createNewUserSuccess = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUser(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersRedux());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error:', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersRedux = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ALL_USERS_START
            })
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersRedux error:', e);
        }
    }
}

export const fetchAllUsersSuccess = (usersData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: usersData
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const setUserEditing = (user) => ({
    type: actionTypes.EDIT_SET_USER,
    data: user
});

export const clearUserEditing = () => ({
    type: actionTypes.EDIT_CLEAR_USER
});

export const updateUserRedux = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.UPDATE_USER_START });
            const res = await updateUserApi(data);
            if (res && res.errCode === 0) {
                dispatch({ type: actionTypes.UPDATE_USER_SUCCESS });
                dispatch(fetchAllUsersRedux());
            } else {
                dispatch({ type: actionTypes.UPDATE_USER_FAILED });
            }
        } catch (e) {
            dispatch({ type: actionTypes.UPDATE_USER_FAILED });
            console.log('updateUserRedux error:', e);
        }
    }
}

export const deleteUserRedux = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DELETE_USER_START });
            const res = await deleteUserApi(userId);
            if (res && res.errCode === 0) {
                dispatch({ type: actionTypes.DELETE_USER_SUCCESS });
                dispatch(fetchAllUsersRedux());
            } else {
                dispatch({ type: actionTypes.DELETE_USER_FAILED });
            }
        } catch (e) {
            dispatch({ type: actionTypes.DELETE_USER_FAILED });
            console.log('deleteUserRedux error:', e);
        }
    }
}