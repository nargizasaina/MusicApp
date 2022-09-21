import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArtists} from "../../store/actions/artistsActions";
import {Link} from "react-router-dom";
import {Box, Button, Grid, Typography} from "@mui/material";
import ArtistsList from "../../components/ArtistsList/ArtistsList";

const MusicAppBuilder = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const loading = useSelector(state => state.artists.loading);


    useEffect(() => {
        dispatch(fetchArtists());
        console.log(artists);
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2} >
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">
                        Artists
                    </Typography>
                </Grid>
                <Grid item>
                    <Button color="primary" component={Link} to="/products/new">
                        Add
                    </Button>
                </Grid>
            </Grid>

            {loading
                ? <Box sx={{textAlign: 'center'}}>Loading  ...</Box>
                : <div className="ArtistsList">
                    {artists.map(artist => (
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