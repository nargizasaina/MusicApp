import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import {fetchArtists} from "../../store/actions/artistsActions";
import ArtistsList from "../../components/ArtistsList/ArtistsList";
import Spinner from "../../components/UI/Spinner/Spinner";

const MusicAppBuilder = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const loading = useSelector(state => state.artists.loading);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2} >
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">
                        Artists
                    </Typography>
                </Grid>
            </Grid>

            {loading
                ? <Spinner/>
                : <div className="List">
                    {artists.map(artist => (
                        artist.publish &&
                        <ArtistsList
                            key={artist._id}
                            id={artist._id}
                            title={artist.title}
                            image={artist.image}
                        />
                    ))}
                </div>
            }
        </Grid>
    );
};

export default MusicAppBuilder;