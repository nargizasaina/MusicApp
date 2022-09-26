import {
    ADD_TRACK_HISTORY_FAILURE,
    ADD_TRACK_HISTORY_REQUEST,
    ADD_TRACK_HISTORY_SUCCESS, FETCH_TRACK_HISTORY_FAILURE, FETCH_TRACK_HISTORY_REQUEST, FETCH_TRACK_HISTORY_SUCCESS
} from "../actions/trackHistoryActions";

const initialState = {
    trackHistory: [],
    fetchLoading: false,
    fetchError: null,
    addLoading: false,
    addError: null
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACK_HISTORY_REQUEST:
            return {...state, fetchLoading: true, fetchError: null};
        case FETCH_TRACK_HISTORY_SUCCESS:
            return {...state, fetchLoading: false, trackHistory: action.payload};
        case FETCH_TRACK_HISTORY_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};
        case ADD_TRACK_HISTORY_REQUEST:
            return {...state, addLoading: true, addError: null};
        case ADD_TRACK_HISTORY_SUCCESS:
            return {...state, addLoading: false};
        case ADD_TRACK_HISTORY_FAILURE:
            return {...state, addLoading: false, addError: action.payload};
        default:
            return state;
    }
};

export default trackHistoryReducer;