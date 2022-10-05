import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchArtists} from "../../store/actions/artistsActions";
import InputField from "../../components/UI/Form/InputField/InputField";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import {addAlbum} from "../../store/actions/albumsActions";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";

const AddAlbum = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);
    const error = useSelector(state => state.albums.addError);
    const loading = useSelector(state => state.albums.addLoading);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const [album, setAlbum] = useState({
        title: '',
        artist: '',
        image: '',
        year: ''
    });

    const onChange = e => {
        const {name, value} = e.target;
        setAlbum(prevState => ({...prevState, [name]: value}));
    };

    const onFileChange = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setAlbum(prevState => ({...prevState, [name]: file}));
    };

    const onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(album).forEach(key => {
            formData.append(key, album[key]);
        });

        dispatch(addAlbum(formData));
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
                New album
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
                        value={album.artist}
                        error={getFieldError('artist')}
                    />
                    <InputField
                        onChange={onChange}
                        name="title"
                        label='Title'
                        value={album.title}
                        error={getFieldError('title')}
                    />
                    <InputField
                        onChange={onChange}
                        name="year"
                        label='Year of release'
                        value={album.year}
                        error={getFieldError('year')}
                        type="number"
                    />
                    <Grid item>
                        <FileInput
                            label="Image"
                            name="image"
                            onChange={onFileChange}
                            error={getFieldError('image')}
                        />
                    </Grid>

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

export default AddAlbum;