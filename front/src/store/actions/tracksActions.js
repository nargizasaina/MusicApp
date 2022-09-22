import axiosApi from "../../axiosApi";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, payload: error});

export const fetchTracks = id => {
    return async dispatch => {
        try{
            dispatch(fetchTracksRequest());

            const response = await axiosApi('/tracks?album=' + id);
            dispatch(fetchTracksSuccess(response.data));
            console.log(response.data);
        } catch (e) {
            dispatch(fetchTracksFailure(e.message));
        }
    };
};