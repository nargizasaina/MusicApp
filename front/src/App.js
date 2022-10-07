import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import MusicAppBuilder from "./containers/MusicAppBuilder/MusicAppBuilder";
import Layout from "./components/UI/Layout/Layout";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import AddArtist from "./containers/AddArtist/AddArtist";
import AddAlbum from "./containers/AddAlbum/AddAlbum";
import AddTrack from "./containers/AddTrack/AddTrack";
import AdminPage from "./containers/AdminPage/AdminPage";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={user?.role === 'admin' ? AdminPage : MusicAppBuilder}/>
                <Route path="/albums" exact component={AlbumsPage}/>
                <Route path="/tracks" exact component={TracksPage}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/login" component={Login}/>
                <ProtectedRoute
                    isAllowed={user?.role === 'user'}
                    redirectTo="/"
                    path="/track_history"
                    component={TrackHistory}
                />
                <ProtectedRoute
                    isAllowed={user?.role === 'user'}
                    redirectTo="/"
                    path="/artists/new"
                    component={AddArtist}
                />
                <ProtectedRoute
                    isAllowed={user?.role === 'user'}
                    redirectTo="/"
                    path="/albums/new"
                    component={AddAlbum}
                />
                <ProtectedRoute
                    isAllowed={user?.role === 'user'}
                    redirectTo="/"
                    path="/tracks/new"
                    component={AddTrack}
                />

                {/*<Route path="/artists/new" component={AddArtist}/>*/}
                {/*<Route path="/albums/new" component={AddAlbum}/>*/}
                {/*<Route path="/tracks/new" component={AddTrack}/>*/}

                <Route render={() => <h1>Not Found</h1>} />
            </Switch>
        </Layout>
    );
};

export default App;