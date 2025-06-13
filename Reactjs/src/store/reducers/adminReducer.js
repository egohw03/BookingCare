import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false
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
            console.log('fetching gender failed: ', action);
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
            console.log('fetching position failed: ', action);
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
            console.log('fetching role failed: ', action);
            return {
                ...copyState
            }
        }
        default:
            return state;
    }
}

export default adminReducer;