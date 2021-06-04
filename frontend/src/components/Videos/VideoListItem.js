import React, {useContext, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {
    Typography,
    Card,
    CardContent,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {AppContext} from "../../contexts/AppContext";

const useStyles = makeStyles((theme) => ({
    root: {},
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    videoContainer: {
        height: 300,
        maxHeight: 500,
        width: '100%',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const VideoListItem = ({video}) => {
    const classes = useStyles();

    return (
        <Card style={{backgroundColor: 'transparent', width: '100%', marginBottom: 15}} >
            <CardContent className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12} xs={12}>
                        <Box component="div" className={classes.videoContainer}>
                            <iframe
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                src={`https://youtube.com/embed/${video.videoId}`}
                                width='100%'
                                height='100%'
                                allowFullScreen
                                title='Video player'/>
                        </Box>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <Box>
                            <Typography style={{fontWeight: 'bold'}} gutterBottom variant="subtitle1" component="h3">
                                {video.title}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" color="textSecondary">
                                Shared by: {video.shared_by}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography style={{fontWeight: 'bold'}} gutterBottom variant="subtitle1" component="h3">
                                Description
                            </Typography>
                            <Typography paragraph>
                                {video.description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default VideoListItem;
