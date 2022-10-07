import axiosApi from "../../axiosApi";
import {historyReplace} from "./historyActions";
import {useToastSuccess} from "../../toastHooks";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const ADD_ARTIST_REQUEST = 'ADD_ARTIST_REQUEST';
export const ADD_ARTIST_SUCCESS = 'ADD_ARTIST_SUCCESS';
export const ADD_ARTIST_FAILURE = 'ADD_ARTIST_FAILURE';

export const PUBLISH_ARTIST_REQUEST = 'PUBLISH_ARTIST_REQUEST';
export const PUBLISH_ARTIST_SUCCESS = 'PUBLISH_ARTIST_SUCCESS';
export const PUBLISH_ARTIST_FAILURE = 'PUBLISH_ARTIST_FAILURE';

export const DELETE_ARTIST_REQUEST = 'DELETE_ARTIST_REQUEST';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const DELETE_ARTIST_FAILURE = 'DELETE_ARTIST_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = error => ({type: FETCH_ARTISTS_FAILURE, payload: error});

const addArtistRequest = () => ({type: ADD_ARTIST_REQUEST});
const addArtistSuccess = () => ({type: ADD_ARTIST_SUCCESS});
const addArtistFailure = error => ({type: ADD_ARTIST_FAILURE, payload: error});

const publishArtistRequest = () => ({type: PUBLISH_ARTIST_REQUEST});
const publishArtistSuccess = () => ({type: PUBLISH_ARTIST_SUCCESS});
const publishArtistFailure = (error) => ({type: PUBLISH_ARTIST_FAILURE, payload: error});

const deleteArtistRequest = () => ({type: DELETE_ARTIST_REQUEST});
const deleteArtistSuccess = () => ({type: DELETE_ARTIST_SUCCESS});
const deleteArtistFailure = error => ({type: DELETE_ARTIST_FAILURE, payload: error});

export const fetchArtists = () => {
    return async dispatch => {
        try {
            dispatch(fetchArtistsRequest());

            const response = await axiosApi('/artists');
            dispatch(fetchArtistsSuccess(response.data));

        } catch (e) {
            dispatch(fetchArtistsFailure(e.message));
        }
    };
};

export const addArtist = data => {
    return async dispatch => {
        try {
            dispatch(addArtistRequest());
            await axiosApi.post('/artists', data);

            dispatch(addArtistSuccess());
            dispatch(historyReplace('/'));
            useToastSuccess('Artist is added successfully!');
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addArtistFailure(e.response.data));
            } else {
                dispatch(addArtistFailure({global: 'No internet'}));
            }
            throw e;
        }
    };
};

export const publishArtist = id => {
    return async dispatch => {
        try{
            dispatch(publishArtistRequest());
            await axiosApi.post('/artists/' + id + '/publish');
            dispatch(publishArtistSuccess());
            useToastSuccess('Artist is published successfully!');
        } catch (e) {
            dispatch(publishArtistFailure(e.message));
        }
    };
};

export const deleteArtist = id => {
    return async dispatch => {
        try{
            dispatch(deleteArtistRequest());

            await axiosApi.delete('/artists/' + id);
            dispatch(deleteArtistSuccess());
            useToastSuccess('Artist is deleted successfully!');
        } catch (e) {
            dispatch(deleteArtistFailure(e.message));
        }
    };
};