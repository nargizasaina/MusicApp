import axiosApi from "../../axiosApi";
import {historyReplace} from "./historyActions";
import {useToastSuccess} from "../../toastHooks";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const ADD_ARTIST_REQUEST = 'ADD_ARTIST_REQUEST';
export const ADD_ARTIST_SUCCESS = 'ADD_ARTIST_SUCCESS';
export const ADD_ARTIST_FAILURE = 'ADD_ARTIST_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = error => ({type: FETCH_ARTISTS_FAILURE, payload: error});

const addArtistRequest = () => ({type: ADD_ARTIST_REQUEST});
const addArtistSuccess = () => ({type: ADD_ARTIST_SUCCESS});
const addArtistFailure = error => ({type: ADD_ARTIST_FAILURE, payload: error});

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

            console.log(data);

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