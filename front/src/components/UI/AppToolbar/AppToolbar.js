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
    staticToolbar: {
        marginBottom: theme.spacing(2),

    },
}));

const AppToolbar = () => {
    const { classes } = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            <Link to="/" className={classes.mainLink}>
                                Your Music Application
                            </Link>
                        </Typography>
                        <Button
                            // component={Link} to="/register" color="inherit"
                        >
                            Sign Up
                        </Button>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;