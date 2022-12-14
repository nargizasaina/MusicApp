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
    const user = useSelector(state => state.users.user);

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
                    {artists.length < 1 &&
                        <Typography variant="body">
                        There are no Artists. Please add...
                    </Typography>
                    }
                </Grid>
            </Grid>
            {loading
                ? <Spinner/>
                : <div className="List">
                    {artists.map(artist => (
                        (artist.publish || (!artist.publish && artist.addedBy === user?._id)) &&
                        <ArtistsList
                            key={artist._id}
                            id={artist._id}
                            title={artist.title}
                            image={artist.image}
                            publish={artist.publish}
                        />
                    ))}
                </div>
            }
        </Grid>
    );
};

export default MusicAppBuilder;