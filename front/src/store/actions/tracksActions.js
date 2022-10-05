import axiosApi from "../../axiosApi";
import {historyReplace} from "./historyActions";
import {useToastSuccess} from "../../toastHooks";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const ADD_TRACK_REQUEST = 'ADD_TRACK_REQUEST';
export const ADD_TRACK_SUCCESS = 'ADD_TRACK_SUCCESS';
export const ADD_TRACK_FAILURE = 'ADD_TRACK_FAILURE';

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, payload: error});

const addTrackRequest = () => ({type: ADD_TRACK_REQUEST});
const addTrackSuccess = () => ({type: ADD_TRACK_SUCCESS});
const addTrackFailure = error => ({type: ADD_TRACK_FAILURE, payload: error});

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