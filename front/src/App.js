import React from 'react';
import {Route, Switch} from "react-router-dom";
import MusicAppBuilder from "./containers/MusicAppBuilder/MusicAppBuilder";
import Layout from "./components/UI/Layout/Layout";
import ArtistAlbums from "./containers/ArtistAlbums/ArtistAlbums";
import AlbumTracks from "./containers/AlbumTracks/AlbumTracks";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={MusicAppBuilder}/>
                <Route path="/albums" component={ArtistAlbums}/>
                <Route path="/tracks" component={AlbumTracks}/>
                <Route path="/registration" exact component={Registration}/>
                <Route path="/login" exact component={Login}/>
                <Route render={() => <h1>Not Found</h1>} />
            </Switch>
        </Layout>
    );
};

export default App;