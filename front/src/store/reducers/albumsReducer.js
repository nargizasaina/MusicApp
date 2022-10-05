import {
    ADD_ALBUM_FAILURE,
    ADD_ALBUM_REQUEST, ADD_ALBUM_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS, FETCH_ALL_ALBUMS_FAILURE, FETCH_ALL_ALBUMS_REQUEST, FETCH_ALL_ALBUMS_SUCCESS
} from "../actions/albumsActions";

const initialState = {
    allAlbums: [],
    albumsById: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_ALBUMS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ALL_ALBUMS_SUCCESS:
            return {...state, loading: false, allAlbums: action.payload};
        case FETCH_ALL_ALBUMS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case FETCH_ALBUMS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ALBUMS_SUCCESS:
            return {...state, loading: false, albumsById: action.payload};
        case FETCH_ALBUMS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case ADD_ALBUM_REQUEST:
            return {...state, addError: null, addLoading: true};
        case ADD_ALBUM_SUCCESS:
            return {...state, addLoading: false};
        case ADD_ALBUM_FAILURE:
            return {...state, addError: action.payload, addLoading: false};
        default:
            return state;
    }
};

export default albumsReducer;