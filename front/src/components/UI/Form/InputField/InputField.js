import React from 'react';
import {Grid, TextField} from "@mui/material";
import PropTypes from 'prop-types';

const InputField = ({name, value, onChange, label, error, type, required}) => {
    return (
        <Grid item xs={12}>
            <TextField
                type={type}
                name={name}
                value={value}
                label={label}
                onChange={onChange}
                required={required}
                error={Boolean(error)}
                helperText={error}
                autoComplete={name}
                fullWidth
                // margin="normal"
            />
        </Grid>
    );
};

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool
};

export default InputField;