import {
    ADD_TRACK_FAILURE,
    ADD_TRACK_REQUEST, ADD_TRACK_SUCCESS,
    FETCH_TRACKS_FAILURE,
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS
} from "../actions/tracksActions";

const initialState = {
    tracks: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_TRACKS_SUCCESS:
            return {...state, loading: false, tracks: action.payload};
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case ADD_TRACK_REQUEST:
            return {...state, addError: null, addLoading: true};
        case ADD_TRACK_SUCCESS:
            return {...state, addLoading: false};
        case ADD_TRACK_FAILURE:
            return {...state, addError: action.payload, addLoading: false};
        default:
            return state;
    }
};

export default tracksReducer;