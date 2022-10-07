import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteArtist, fetchArtists, publishArtist} from "../../store/actions/artistsActions";
import {deleteAlbum, fetchAllAlbums, publishAlbum} from "../../store/actions/albumsActions";
import {deleteTrack, fetchAllTracks, publishTrack} from "../../store/actions/tracksActions";
import AdminPageArtists from "../../components/AdminPageArtists/AdminPageArtists";
import {Typography} from "@mui/material";
import AdminPageTracks from "../../components/AdminPageTracks/AdminPageTracks";
import Spinner from "../../components/UI/Spinner/Spinner";
import AdminPageAlbums from "../../components/AdminPageAlbums/AdminPageAlbums";

const AdminPage = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const albums = useSelector(state => state.albums.allAlbums);
    const loading = useSelector(state => state.albums.loading);
    const tracks = useSelector(state => state.tracks.allTracks);

    useEffect(() => {
        dispatch(fetchArtists());
        dispatch(fetchAllAlbums());
        dispatch(fetchAllTracks());
    }, [dispatch]);

    const onArtistPublish = async id => {
        await dispatch(publishArtist(id));
        dispatch(fetchArtists());
    };

    const onAlbumPublish = async id => {
        await dispatch(publishAlbum(id));
        dispatch(fetchAllAlbums());
    };

    const onTrackPublish = async id => {
        await dispatch(publishTrack(id));
        dispatch(fetchAllTracks());
    };

    const onArtistDelete = async (id) => {
        await dispatch(deleteArtist(id));
        dispatch(fetchArtists());
    };

    const onAlbumDelete = async (id) => {
        await dispatch(deleteAlbum(id));
        dispatch(fetchAllAlbums());
    };

    const onTrackDelete = async (id) => {
        await dispatch(deleteTrack(id));
        dispatch(fetchAllTracks());
    };

    return (
        loading ? <Spinner/> :
            <>
                <Typography gutterBottom variant="h5" component="div">
                    Artists
                </Typography>
                {artists.map(artist => (
                    <AdminPageArtists
                        key={artist._id}
                        id={artist._id}
                        title={artist.title}
                        image={artist.image}
                        description={artist.description}
                        publish={artist.publish}
                        onPublish={onArtistPublish}
                        onDelete={onArtistDelete}
                    />
                ))}
                <Typography gutterBottom variant="h5" component="div">
                    Albums
                </Typography>
                {albums.map(album => (
                    <AdminPageAlbums
                        key={album._id}
                        id={album._id}
                        title={album.title}
                        image={album.image}
                        artist={album.artist?.title}
                        year={album.year}
                        publish={album.publish}
                        onPublish={onAlbumPublish}
                        onDelete={onAlbumDelete}
                    />
                ))}
                <Typography gutterBottom variant="h5" component="div">
                    Tracks
                </Typography>
                {tracks.map(track => (
                    <AdminPageTracks
                        key={track._id}
                        id={track._id}
                        title={track.title}
                        album={track.album?.title}
                        length={track.length}
                        number={track.number}
                        publish={track.publish}
                        onPublish={onTrackPublish}
                        onDelete={onTrackDelete}
                    />
                ))}
            </>
    );
};

export default AdminPage;