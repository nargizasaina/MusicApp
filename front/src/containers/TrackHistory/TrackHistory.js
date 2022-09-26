import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTrackHistory} from "../../store/actions/trackHistoryActions";
import {Container, Typography} from "@mui/material";

const TrackHistory = () => {
    const dispatch = useDispatch();
    const trackHistory = useSelector(state => state.trackHistory.trackHistory);

    useEffect(() => {
        dispatch(fetchTrackHistory());
    }, [dispatch]);

    return (
        <Container>
            {trackHistory[0] ?
                <Typography variant="h5">
                    List of tracks in your Track History
                </Typography>
                : <Typography variant="h5">
                    There are no tracks in your Track History
                </Typography> }
            <ul>
                {trackHistory.map(history => (
                    <li
                        key={history._id}
                    >
                        Artist: <b> {history.track.album.artist.title} </b> <br/>
                        Song: <b>{history.track.title} </b> <br/>
                        Date and time you listened <b>{new Date(history.datetime).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</b>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default TrackHistory;