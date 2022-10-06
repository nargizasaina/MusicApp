import axiosApi from "../../axiosApi";
import {historyReplace} from "./historyActions";
import {useToastSuccess} from "../../toastHooks";

export const FETCH_ALL_TRACKS_REQUEST = 'FETCH_ALL_TRACKS_REQUEST';
export const FETCH_ALL_TRACKS_SUCCESS = 'FETCH_ALL_TRACKS_SUCCESS';
export const FETCH_ALL_TRACKS_FAILURE = 'FETCH_ALL_TRACKS_FAILURE';

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const ADD_TRACK_REQUEST = 'ADD_TRACK_REQUEST';
export const ADD_TRACK_SUCCESS = 'ADD_TRACK_SUCCESS';
export const ADD_TRACK_FAILURE = 'ADD_TRACK_FAILURE';

export const PUBLISH_TRACK_REQUEST = 'PUBLISH_TRACK_REQUEST';
export const PUBLISH_TRACK_SUCCESS = 'PUBLISH_TRACK_SUCCESS';
export const PUBLISH_TRACK_FAILURE = 'PUBLISH_TRACK_FAILURE';

export const DELETE_TRACK_REQUEST = 'DELETE_TRACK_REQUEST';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';
export const DELETE_TRACK_FAILURE = 'DELETE_TRACK_FAILURE';

const fetchAllTracksRequest = () => ({type: FETCH_ALL_TRACKS_REQUEST});
const fetchAllTracksSuccess = tracks => ({type: FETCH_ALL_TRACKS_SUCCESS, payload: tracks});
const fetchAllTracksFailure = error => ({type: FETCH_ALL_TRACKS_FAILURE, payload: error});

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, payload: error});

const addTrackRequest = () => ({type: ADD_TRACK_REQUEST});
const addTrackSuccess = () => ({type: ADD_TRACK_SUCCESS});
const addTrackFailure = error => ({type: ADD_TRACK_FAILURE, payload: error});

const publishTrackRequest = () => ({type: PUBLISH_TRACK_REQUEST});
const publishTrackSuccess = () => ({type: PUBLISH_TRACK_SUCCESS});
const publishTrackFailure = error => ({type: PUBLISH_TRACK_FAILURE, payload: error});

const deleteTrackRequest = () => ({type: DELETE_TRACK_REQUEST});
const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});
const deleteTrackFailure = error => ({type: DELETE_TRACK_FAILURE, payload: error});

export const fetchAllTracks = () => {
    return async dispatch => {
        try{
            dispatch(fetchAllTracksRequest());

            const response = await axiosApi('/tracks');
            dispatch(fetchAllTracksSuccess(response.data));
        } catch (e) {
            dispatch(fetchAllTracksFailure(e.message));
        }
    };
};

export const fetchTracks = id => {
    return async dispatch => {
        try{
            dispatch(fetchTracksRequest());

            const response = await axiosApi('/tracks?album=' + id);
            dispatch(fetchTracksSuccess(response.data));
        } catch (e) {
            dispatch(fetchTracksFailure(e.message));
        }
    };
};

export const addTrack = data => {
    return async dispatch => {
        try{
            dispatch(addTrackRequest());

            await axiosApi.post('/tracks', data);
            dispatch(addTrackSuccess());
            dispatch(historyReplace('/'));
            useToastSuccess('The track is added successfully!');
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(addTrackFailure(e.response.data));
            } else {
                dispatch(addTrackFailure({global: 'No Internet'}));
            }
            throw e;
        }
    };
};

export const publishTrack = id => {
    return async dispatch => {
        try{
            dispatch(publishTrackRequest());
            await axiosApi.post('tracks/' + id + '/publish');

            dispatch(publishTrackSuccess());
            useToastSuccess('The track is published successfully!')
        } catch (e) {
            dispatch(publishTrackFailure());
        }
    };
};

export const deleteTrack = id => {
    return async dispatch => {
        try{
            dispatch(deleteTrackRequest());

            await axiosApi.delete('/tracks/' + id);
            dispatch(deleteTrackSuccess());
            useToastSuccess('The track is deleted successfully!')
        } catch (e) {
            dispatch(deleteTrackFailure(e.message));
        }
    };
};