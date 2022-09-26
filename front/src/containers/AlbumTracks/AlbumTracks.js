import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, Typography} from "@mui/material";
import {fetchTracks} from "../../store/actions/tracksActions";
import {addTrackHistory} from "../../store/actions/trackHistoryActions";

const AlbumTracks = ({location}) => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks.tracks);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.getAll('album');
        dispatch(fetchTracks(id[0]));
    }, [dispatch, location.search]);

    const onTrackClick = id => {
        dispatch(addTrackHistory(id));
        console.log('daone');
    };

    return (
        <Container sx={{marginTop: "-16px", paddingTop: "16px"}}>
            {tracks[0] ?
                <Typography variant="h5">
                    List of tracks in album <b>{tracks[0].album.title}</b> of <b>{tracks[0].album.artist.title}</b>
                </Typography>
                : <Typography variant="h5">
                    There are no tracks in this album
                </Typography> }
            <ul>
                {tracks.map(track => (
                    <li
                        key={track._id}
                        style={user ? {cursor: 'pointer'} : {cursor: 'default'}}
                        onClick={() => onTrackClick(track._id)}
                    >
                        Track number: <b> {track.number} </b> <br/>
                        Song: <b>{track.title} </b> <br/>
                        Song length: <b>{track.length}</b>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default AlbumTracks;