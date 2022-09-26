import React from 'react';
import {Grid, TextField} from "@mui/material";

const InputField = ({name, value, onChange, label, error, type, required}) => {
    return (
        <Grid item xs={12}>
            <TextField
                type={type}
                required={required}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={Boolean(error)}
                helperText={error}
                autoComplete={name}
                fullWidth
                margin="normal"
            />
        </Grid>
    );
};

export default InputField;