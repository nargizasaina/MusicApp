import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import artistsReducer from "./reducers/artistsReducer";
import albumsReducer from "./reducers/albumsReducer";
import tracksReducer from "./reducers/tracksReducer";
import usersReducer, {initialState} from "./reducers/usersReducer";
import trackHistoryReducer from "./reducers/trackHistoryReducer";
import thunk from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: usersReducer,
    trackHistory: trackHistoryReducer
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user
        },
    })
});

axiosApi.interceptors.request.use(config => {
    try{
        config.headers['Authorization'] =store.getState().users.user.token;
    } catch (e) {}
    return config;
});

export default store;
