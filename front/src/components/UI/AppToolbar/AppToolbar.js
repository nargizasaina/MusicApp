import React from 'react';
import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(theme => ({
    appBar: {
        background: '#110e52'
    },
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        },
    },
}));

const AppToolbar = () => {
    const { classes } = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6">
                                <Link to="/" className={classes.mainLink}>
                                    Your Music Application
                                </Link>
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Button component={Link} to="/registration" color="inherit">
                                Sign Up
                            </Button>
                            <Button component={Link} to="/login" color="inherit">
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};

export default AppToolbar;