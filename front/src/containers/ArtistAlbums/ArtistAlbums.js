import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import {fetchAlbums} from "../../store/actions/albumsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import AlbumsList from "../../components/AlbumsList/AlbumsList";

const ArtistAlbums = ({match}) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums.albums);
    const loading = useSelector(state => state.albums.loading);

    useEffect(() => {
        dispatch(fetchAlbums(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <Grid container direction="column" spacing={2} >
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">
                        Albums of
                    </Typography>
                </Grid>
            </Grid>

            {loading
                ? <Spinner/>
                : <div className="List">
                    {albums.map(album => (
                        <AlbumsList
                            key={album._id}
                            id={album._id}
                            title={album.title}
                            image={album.image}
                            year={album.year}
                        />
                    ))}
                </div>
            }
        </Grid>
    );
};

export default ArtistAlbums;