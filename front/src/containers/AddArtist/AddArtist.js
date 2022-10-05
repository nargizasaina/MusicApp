import React, {useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addArtist} from "../../store/actions/artistsActions";
import InputField from "../../components/UI/Form/InputField/InputField";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from "../../components/UI/Form/FileInput/FileInput";

const AddArtist = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.artists.addError);
    const loading = useSelector(state => state.artists.addLoading);

    const [artist, setArtist] = useState({
        title: '',
        image: '',
        description: ''
    });

    const onChange = e => {
        const {name, value} = e.target;
        setArtist(prevState => ({...prevState, [name]: value}));
    };

    const onFileChange = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setArtist(prevState => ({...prevState, [name]: file}));
    };

    const onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(artist).forEach(key => {
            formData.append(key, artist[key]);
        });

        dispatch(addArtist(formData));
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
                New artist
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
                    <InputField
                        onChange={onChange}
                        name="title"
                        label='Title'
                        value={artist.title}
                        error={getFieldError('title')}
                    />
                    <InputField
                        onChange={onChange}
                        name="description"
                        label='Description'
                        value={artist.description}
                        error={getFieldError('description')}
                    />
                    <Grid item>
                        <FileInput
                            label="image"
                            name="image"
                            onChange={onFileChange}
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

export default AddArtist;