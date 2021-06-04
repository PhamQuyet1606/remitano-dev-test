import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {
    TextField,
    Button,
    Typography,
    FormControl,
} from "@material-ui/core";
import CustomCircularProgress from "../shared/CustomCircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {getYoutubeVideoInfo} from "../../services/youtubeVideoService";
import Box from "@material-ui/core/Box";

const sharinFormStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '75%',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '50%',
        },
    },
    container: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    textBox: {
        width: '100%',
        // [theme.breakpoints.down('sm')]: {
        //     width: '100%',
        // },
        // [theme.breakpoints.up('md')]: {
        //     width: '100%',
        // },
        // [theme.breakpoints.up('lg')]: {
        //     width: '80%',
        // },
    },
    videoContainer: {
        height: 300,
        maxHeight: 500,
        width: '100%',
        // [theme.breakpoints.down('sm')]: {
        //     width: '100%',
        // },
        // [theme.breakpoints.up('md')]: {
        //     width: '90%',
        // },
        // [theme.breakpoints.up('lg')]: {
        //     width: '80%',
        // },
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    }
}));

const VideoSharingForm = () => {
    const classes = sharinFormStyle();
    const [loading, setLoading] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState('');

    const handleChange = (evt) => {
        setLoading(true);
        getYoutubeVideoInfo(evt.target.value)
            .then((res) => {
                setYoutubeUrl(res.video.url);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // setLoading(true);
    };

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <Card variant="outlined" style={{backgroundColor: 'transparent'}}  className={classes.container}>
                <CardHeader title="Share a Youtube movie" />
                <CardContent>
                    <FormControl className={classes.textBox}>
                        <TextField
                            required
                            placeholder="https://youtube.com/"
                            id="youtubeUrl"
                            name="youtubeUrl"
                            size="medium"
                            onChange={handleChange}
                        />
                    </FormControl>
                    {
                        loading && (
                            <CustomCircularProgress/>
                        )
                    }
                    {
                        youtubeUrl && (
                            <Box component="div" m={1} className={classes.videoContainer}>
                                <iframe
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    src={youtubeUrl}
                                    width='100%'
                                    height='100%'
                                    allowFullScreen
                                    title='Video player'/>
                            </Box>
                        )
                    }
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button size="medium" color="primary" type="submit" variant="contained">
                        Share
                    </Button>
                    <Button size="medium" color="secondary" variant="outlined">
                        Clear
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default VideoSharingForm;
