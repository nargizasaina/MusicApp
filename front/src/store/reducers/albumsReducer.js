import {
    ADD_ALBUM_FAILURE,
    ADD_ALBUM_REQUEST,
    ADD_ALBUM_SUCCESS,
    DELETE_ALBUM_FAILURE,
    DELETE_ALBUM_REQUEST,
    DELETE_ALBUM_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALL_ALBUMS_FAILURE,
    FETCH_ALL_ALBUMS_REQUEST,
    FETCH_ALL_ALBUMS_SUCCESS, PUBLISH_ALBUM_FAILURE,
    PUBLISH_ALBUM_REQUEST, PUBLISH_ALBUM_SUCCESS
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

        case PUBLISH_ALBUM_REQUEST:
            return {...state, loading: true, error: null};
        case PUBLISH_ALBUM_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_ALBUM_FAILURE:
            return {...state, loading: false, error: action.payload};

        case DELETE_ALBUM_REQUEST:
            return {...state, error: null, loading: true};
        case DELETE_ALBUM_SUCCESS:
            return {...state, loading: false};
        case DELETE_ALBUM_FAILURE:
            return {...state, error: action.payload, loading: false};
        default:
            return state;
    }
};

export default albumsReducer;