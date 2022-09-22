import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, Typography} from "@mui/material";
import {fetchTracks} from "../../store/actions/tracksActions";

const AlbumTracks = ({match}) => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks.tracks);

    useEffect(() => {
        dispatch(fetchTracks(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <Container sx={{marginTop: "-16px", paddingTop: "16px"}}>
            <Typography variant="h5">
                Artists
            </Typography>
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