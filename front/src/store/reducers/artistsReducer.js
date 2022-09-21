import {FETCH_ARTISTS_FAILURE, FETCH_ARTISTS_REQUEST, FETCH_ARTISTS_SUCCESS} from "../actions/artistsActions";

const initialState = {
    artists: [],
    loading: false,
    error: null,
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ARTISTS_SUCCESS:
            return {...state, loading: false, artists: action.payload};
        case FETCH_ARTISTS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default artistsReducer;