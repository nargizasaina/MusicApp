import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {historyReplace} from "./historyActions";

export const FETCH_TRACK_HISTORY_REQUEST = 'FETCH_TRACK_HISTORY_REQUEST';
export const FETCH_TRACK_HISTORY_SUCCESS = 'FETCH_TRACK_HISTORY_SUCCESS';
export const FETCH_TRACK_HISTORY_FAILURE = 'FETCH_TRACK_HISTORY_FAILURE';

export const ADD_TRACK_HISTORY_REQUEST = 'ADD_TRACK_HISTORY_REQUEST';
export const ADD_TRACK_HISTORY_SUCCESS = 'ADD_TRACK_HISTORY_SUCCESS';
export const ADD_TRACK_HISTORY_FAILURE = 'ADD_TRACK_HISTORY_FAILURE';

const fetchTrackHistoryRequest = () => ({type: FETCH_TRACK_HISTORY_REQUEST});
const fetchTrackHistorySuccess = history => ({type: FETCH_TRACK_HISTORY_SUCCESS, payload: history});
const fetchTrackHistoryFailure = (error) => ({type: FETCH_TRACK_HISTORY_FAILURE, payload: error});

const addTrackHistoryRequest = () => ({type: ADD_TRACK_HISTORY_REQUEST});
const addTrackHistorySuccess = () => ({type: ADD_TRACK_HISTORY_SUCCESS});
const addTrackHistoryFailure = (error) => ({type: ADD_TRACK_HISTORY_FAILURE, payload: error});

export const fetchTrackHistory = () => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(fetchTrackHistoryRequest());
            const response = await axiosApi('/track_history', {headers});
            dispatch(fetchTrackHistorySuccess(response.data));
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(historyReplace('/login'));
            }

            dispatch(fetchTrackHistoryFailure(e.message));
        }
    };
};

export const addTrackHistory = (track) => {
    return async (dispatch, getState) => {
        try {
            const body = {track};

            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(addTrackHistoryRequest());
            await axiosApi.post('/track_history', body, {headers});
            dispatch(addTrackHistorySuccess());
        } catch (e) {
            if (e.response.status === 401) {
                toast.warn('Please login!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            dispatch(addTrackHistoryFailure(e.message));
        }
    };
};