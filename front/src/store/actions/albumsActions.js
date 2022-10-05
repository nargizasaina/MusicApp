import axiosApi from "../../axiosApi";
import {historyReplace} from "./historyActions";
import {useToastSuccess} from "../../toastHooks";

export const FETCH_ALL_ALBUMS_REQUEST = 'FETCH_ALL_ALBUMS_REQUEST';
export const FETCH_ALL_ALBUMS_SUCCESS = 'FETCH_ALL_ALBUMS_SUCCESS';
export const FETCH_ALL_ALBUMS_FAILURE = 'FETCH_ALL_ALBUMS_FAILURE';

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const ADD_ALBUM_REQUEST = 'ADD_ALBUM_REQUEST';
export const ADD_ALBUM_SUCCESS = 'ADD_ALBUM_SUCCESS';
export const ADD_ALBUM_FAILURE = 'ADD_ALBUM_FAILURE';

const fetchAllAlbumsRequest = () => ({type: FETCH_ALL_ALBUMS_REQUEST});
const fetchAllAlbumsSuccess = albums => ({type: FETCH_ALL_ALBUMS_SUCCESS, payload: albums});
const fetchAllAlbumsFailure = error => ({type: FETCH_ALL_ALBUMS_FAILURE, payload: error});

const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, payload: albums});
const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, payload: error});

const addAlbumRequest = () => ({type: ADD_ALBUM_REQUEST});
const addAlbumSuccess = () => ({type: ADD_ALBUM_SUCCESS});
const addAlbumFailure = error => ({type: ADD_ALBUM_FAILURE, payload: error});

export const fetchAllAlbums = () => {
    return async dispatch => {
        try {
            dispatch(fetchAllAlbumsRequest());

            const response = await axiosApi('/albums');
            dispatch(fetchAllAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(fetchAllAlbumsFailure(e.message));
        }
    };
};

export const fetchAlbums = id => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());

            const response = await axiosApi('/albums?artist=' + id);
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(fetchAlbumsFailure(e.message));
        }
    };
};

export const addAlbum = data => {
    return async dispatch => {
        try{
            dispatch(addAlbumRequest());

            await axiosApi.post('/albums', data);
            dispatch(addAlbumSuccess());
            dispatch(historyReplace('/'));
            useToastSuccess('The Album is added successfully!');
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addAlbumFailure(e.response.data));
            } else {
                dispatch(addAlbumFailure({global: 'No internet'}));
            }
            throw e;
        }
    };
};