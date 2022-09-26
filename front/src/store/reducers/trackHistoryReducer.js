import {
    ADD_TRACK_HISTORY_FAILURE,
    ADD_TRACK_HISTORY_REQUEST,
    ADD_TRACK_HISTORY_SUCCESS
} from "../actions/trackHistoryActions";

const initialState = {
    trackHistory: [],
    loading: false,
    error: null
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRACK_HISTORY_REQUEST:
            return {...state, loading: true, error: null};
        case ADD_TRACK_HISTORY_SUCCESS:
            return {...state, loading: false};
        case ADD_TRACK_HISTORY_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default trackHistoryReducer;