import React from 'react';
import { AppBar, Typography, IconButton, Toolbar, SvgIcon } from '@material-ui/core';
import headerStyles from './headerStyles';
import Grid from "@material-ui/core/Grid";

export default function Header({ children }) {
    const classes = headerStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Grid container>
                        <Grid item md={4} sm={3}>
                            <Grid container>
                                <Grid item md={2}>
                                    <IconButton
                                        edge="start"
                                        className={classes.btnHome}
                                        color="inherit"
                                        aria-label="menu"
                                        href='/'
                                        title="Home"
                                    >
                                        <SvgIcon>
                                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                        </SvgIcon>
                                    </IconButton>
                                </Grid>
                                <Grid item md={10}>
                                    <Typography variant="h6" className={classes.title}>
                                        Funny Movies
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={8} sm={9}>
                            {children}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};
