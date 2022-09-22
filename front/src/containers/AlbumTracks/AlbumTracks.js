import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, Typography} from "@mui/material";
import {fetchTracks} from "../../store/actions/tracksActions";

const AlbumTracks = ({location}) => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks.tracks);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.getAll('album');
        dispatch(fetchTracks(id[0]));
    }, [dispatch, location.search]);

    return (
        <Container sx={{marginTop: "-16px", paddingTop: "16px"}}>
            {tracks[0] ?
                <Typography variant="h5">
                    List of tracks in album <b>{tracks[0].album.title}</b> of
                </Typography>
                : <Typography variant="h5">
                    There are no tracks in this album
                </Typography> }
            <ul>
                {tracks.map(track => (
                    <li
                        key={track._id}
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