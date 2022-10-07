import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import {addTrack} from "../../store/actions/tracksActions";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";
import {fetchAlbums} from "../../store/actions/albumsActions";
import InputField from "../../components/UI/Form/InputField/InputField";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {fetchArtists} from "../../store/actions/artistsActions";

const AddTrack = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const albums = useSelector(state => state.albums.albumsById);
    const error = useSelector(state => state.tracks.addError);
    const loading = useSelector(state => state.tracks.addLoading);

    const [track, setTrack] = useState({
        title: '',
        album: '',
        length: '',
        artist: ''
    });

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAlbums(track.artist));
    }, [dispatch, track.artist]);

    const onChange = e => {
        const {name, value} = e.target;
        setTrack(prevState => ({...prevState, [name]: value}));
    };

    const onSubmit = e => {
        e.preventDefault();
        dispatch(addTrack(track));
    };

    const getFieldError = fieldName => {
        try{
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New track
            </Typography>
            <form
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <Grid
                    container
                    maxWidth="md"
                    textAlign="center"
                    marginX="auto"
                    direction="column"
                    rowSpacing={2}
                >
                    <FormSelect
                        onChange={onChange}
                        name='artist'
                        options={artists}
                        label='Artist'
                        value={track.artist}
                        error={getFieldError('artist')}
                    />
                    <FormSelect
                        onChange={onChange}
                        name='album'
                        options={albums}
                        label='Album'
                        value={track.album}
                        error={getFieldError('album')}
                    />
                    <InputField
                        onChange={onChange}
                        name="title"
                        label='Title'
                        value={track.title}
                        error={getFieldError('title')}
                    />
                    <InputField
                        onChange={onChange}
                        name="length"
                        label='Track length'
                        value={track.length}
                        error={getFieldError('length')}
                    />

                    <Grid item>
                        <ButtonWithProgress
                            type="submit"
                            color="primary"
                            variant="contained"
                            loading={loading}
                        >
                            Create
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default AddTrack;