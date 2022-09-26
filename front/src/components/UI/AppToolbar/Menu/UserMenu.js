import React from 'react';
import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";

const UserMenu = ({user}) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button component={Link} to="/track_history" color="inherit" sx={{marginRight: 20}}>
                Track History
            </Button>
            Hello, {user.username}!
        </Box>
    );
};

export default UserMenu;