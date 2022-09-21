import React from 'react';
import {Route, Switch} from "react-router-dom";
import MusicAppBuilder from "./containers/MusicAppBuilder/MusicAppBuilder";
import Layout from "./components/UI/Layout/Layout";
import ArtistAlbums from "./components/ArtistAlbums/ArtistAlbums";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={MusicAppBuilder}/>
                <Route path="/albums/artist/:id" exact component={ArtistAlbums}/>
                <Route render={() => <h1>Not Found</h1>} />
            </Switch>
        </Layout>
    );
};

export default App;