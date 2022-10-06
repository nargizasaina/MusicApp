import {
    ADD_ARTIST_FAILURE,
    ADD_ARTIST_REQUEST, ADD_ARTIST_SUCCESS, DELETE_ARTIST_FAILURE, DELETE_ARTIST_REQUEST, DELETE_ARTIST_SUCCESS,
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS, PUBLISH_ARTIST_FAILURE, PUBLISH_ARTIST_REQUEST, PUBLISH_ARTIST_SUCCESS
} from "../actions/artistsActions";

const initialState = {
    artists: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ARTISTS_SUCCESS:
            return {...state, loading: false, artists: action.payload};
        case FETCH_ARTISTS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case ADD_ARTIST_REQUEST:
            return {...state, addError: null, addLoading: true};
        case ADD_ARTIST_SUCCESS:
            return {...state, addLoading: false};
        case ADD_ARTIST_FAILURE:
            return {...state, addError: action.payload, addLoading: false};

        case PUBLISH_ARTIST_REQUEST:
            return {...state, loading: true, error: null};
        case PUBLISH_ARTIST_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_ARTIST_FAILURE:
            return {...state, loading: false, error: action.payload};

        case DELETE_ARTIST_REQUEST:
            return {...state, loading: true, error: null};
        case DELETE_ARTIST_SUCCESS:
            return {...state, loading: false};
        case DELETE_ARTIST_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default artistsReducer;