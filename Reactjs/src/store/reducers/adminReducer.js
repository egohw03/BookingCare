import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    createUserSuccess: false,
    createUserError: false,
    users: [],
    isLoadingAllUsers: false,
    userEditing: null,
    isUpdatingUser: false,
    isDeletingUser: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: {
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_GENDER_SUCCESS: {
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_GENDER_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.genders = [];
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_POSITION_START: {
            let copyState = { ...state };
            copyState.isLoadingPosition = true;
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_POSITION_SUCCESS: {
            let copyState = { ...state };
            copyState.positions = action.data;
            copyState.isLoadingPosition = false;
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_POSITION_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingPosition = false;
            copyState.positions = [];
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_ROLE_START: {
            let copyState = { ...state };
            copyState.isLoadingRole = true;
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_ROLE_SUCCESS: {
            let copyState = { ...state };
            copyState.roles = action.data;
            copyState.isLoadingRole = false;
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_ROLE_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingRole = false;
            copyState.roles = [];
            return {
                ...copyState
            }
        }
        case actionTypes.CREATE_USER_SUCCESS: {
            let copyState = { ...state };
            copyState.createUserSuccess = true;
            return {
                ...copyState
            }
        }
        case actionTypes.CREATE_USER_FAILED: {
            let copyState = { ...state };
            copyState.createUserError = true;
            return {
                ...copyState
            }
        }
        case actionTypes.FETCH_ALL_USERS_START: {
            return {
                ...state,
                isLoadingAllUsers: true
            }
        }
        case actionTypes.FETCH_ALL_USERS_SUCCESS: {
            return {
                ...state,
                isLoadingAllUsers: false,
                users: action.data || []
            }
        }
        case actionTypes.FETCH_ALL_USERS_FAILED: {
            return {
                ...state,
                isLoadingAllUsers: false,
                users: []
            }
        }
        case actionTypes.EDIT_SET_USER: {
            return { ...state, userEditing: action.data }
        }
        case actionTypes.EDIT_CLEAR_USER: {
            return { ...state, userEditing: null }
        }
        case actionTypes.UPDATE_USER_START: {
            return { ...state, isUpdatingUser: true }
        }
        case actionTypes.UPDATE_USER_SUCCESS: {
            return { ...state, isUpdatingUser: false, userEditing: null }
        }
        case actionTypes.UPDATE_USER_FAILED: {
            return { ...state, isUpdatingUser: false }
        }
        case actionTypes.DELETE_USER_START: {
            return { ...state, isDeletingUser: true }
        }
        case actionTypes.DELETE_USER_SUCCESS: {
            return { ...state, isDeletingUser: false }
        }
        case actionTypes.DELETE_USER_FAILED: {
            return { ...state, isDeletingUser: false }
        }
        default:
            return state;
    }
}

export default adminReducer;