import {
    ADD_TRACK_FAILURE,
    ADD_TRACK_REQUEST,
    ADD_TRACK_SUCCESS, DELETE_TRACK_FAILURE, DELETE_TRACK_REQUEST,
    DELETE_TRACK_SUCCESS,
    FETCH_ALL_TRACKS_FAILURE,
    FETCH_ALL_TRACKS_REQUEST,
    FETCH_ALL_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE,
    FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS, PUBLISH_TRACK_FAILURE, PUBLISH_TRACK_REQUEST, PUBLISH_TRACK_SUCCESS
} from "../actions/tracksActions";

const initialState = {
    allTracks: [],
    tracksById: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ALL_TRACKS_SUCCESS:
            return {...state, loading: false, allTracks: action.payload};
        case FETCH_ALL_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_TRACKS_SUCCESS:
            return {...state, loading: false, tracksById: action.payload};
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case ADD_TRACK_REQUEST:
            return {...state, addError: null, addLoading: true};
        case ADD_TRACK_SUCCESS:
            return {...state, addLoading: false};
        case ADD_TRACK_FAILURE:
            return {...state, addError: action.payload, addLoading: false};

        case PUBLISH_TRACK_REQUEST:
            return {...state, loading: true, error: null};
        case PUBLISH_TRACK_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_TRACK_FAILURE:
            return {...state, loading: false, error: action.payload};

        case DELETE_TRACK_REQUEST:
            return {...state, loading: true, error: null};
        case DELETE_TRACK_SUCCESS:
            return {...state, loading: false};
        case DELETE_TRACK_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default tracksReducer;