import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import {fetchAlbums} from "../../store/actions/albumsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import AlbumsList from "../../components/AlbumsList/AlbumsList";

const AlbumsPage = ({location}) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums.albumsById);
    const loading = useSelector(state => state.albums.loading);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.getAll('artist');
        dispatch(fetchAlbums(id[0]));
    }, [dispatch, location.search]);

    return (
        <Grid container direction="column" spacing={2} >
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    {albums[0] ?
                    <Typography variant="h5">
                        Albums of <b>{albums[0].artist.title}</b>
                    </Typography>
                        : <Typography variant="h5">
                            There are no albums of this artist
                        </Typography> }
                </Grid>
            </Grid>

            {loading
                ? <Spinner/>
                : <div className="List">
                    {albums.map(album => (
                        (album.publish || (!album.publish && album.addedBy === user?._id)) &&
                        <AlbumsList
                            key={album._id}
                            id={album._id}
                            title={album.title}
                            image={album.image}
                            year={album.year}
                            publish={album.publish}
                        />
                    ))}
                </div>
            }
        </Grid>
    );
};

export default AlbumsPage;