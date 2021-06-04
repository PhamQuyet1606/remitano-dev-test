import React, {useContext, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {
    TextField,
    Button,
    Typography,
    FormControl,
} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import CustomCircularProgress from "../shared/CustomCircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {getYoutubeVideoInfo, saveVideo} from "../../services/youtubeVideoService";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import {AppContext} from "../../contexts/AppContext";

const sharingFormStyle = makeStyles(theme => ({
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
    },
    videoContainer: {
        height: 300,
        maxHeight: 500,
        width: '100%',
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingTop: 15,
        paddingBottom: 15,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const VideoSharingForm = () => {
    const classes = sharingFormStyle();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [youtubeInputUrl, setYoutubeInputUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeVideoInfo, setYoutubeVideoInfo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [state, dispatch] = useContext(AppContext);

    const handleChange = (evt) => {
        evt.preventDefault();
        setYoutubeInputUrl(evt.target.value);
        if (evt.target.value) {
            setLoading(true);
            getYoutubeVideoInfo(evt.target.value)
                .then((res) => {
                    if (!res.isError) {
                        setYoutubeUrl(`https://www.youtube.com/embed/${res.video.id}`);
                        setYoutubeVideoInfo(res.video.info);
                        // handleClearMessages();
                    } else {
                        setError(res.error);
                    }
                })
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setYoutubeUrl('');
            setYoutubeVideoInfo(null);
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleClearMessages();
        setSubmitting(true);
        const videoInfo = {
            id: youtubeVideoInfo.id
        };
        const data = {
            user: state.profile.email,
            video: {
                ...videoInfo,
                ...youtubeVideoInfo.snippet
            },
        };

        saveVideo(data)
            .then((res) => {
                if (!res.isError) {
                    setSuccess(res.data.message);
                    handleResetForm();
                } else {
                    setError(res.error.message);
                }
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleClearMessages = () => {
        setError('');
        setSuccess('');
    };

    const handleResetForm = () => {
        setYoutubeInputUrl('');
        setYoutubeUrl('');
        setYoutubeVideoInfo(null);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <Card variant="outlined" style={{backgroundColor: 'transparent'}}  className={classes.container}>
                <CardHeader title="Share a Youtube movie" />
                <CardContent>
                    {
                        success && (
                            <Alert severity="success" onClose={() => {
                                setSuccess('');
                            }}>
                                <AlertTitle>Success</AlertTitle>
                                {success}
                            </Alert>
                        )
                    }
                    {
                        error && (
                            <Alert severity="error" onClose={() => {
                                setError('');
                            }}>
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        )
                    }
                    <FormControl className={classes.textBox}>
                        <TextField
                            value={youtubeInputUrl}
                            required
                            placeholder="https://youtube.com/embed/"
                            id="youtubeUrl"
                            name="youtubeUrl"
                            size="medium"
                            label="Youtube URL"
                            variant="outlined"
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
                            <Card style={{border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
                                <CardContent style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
                                    <Typography gutterBottom variant="h6" component="h5">
                                        Movie Preview
                                    </Typography>
                                    <Box component="div" className={classes.videoContainer}>
                                        <iframe
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            src={youtubeUrl}
                                            width='100%'
                                            height='100%'
                                            allowFullScreen
                                            title='Video player'/>
                                    </Box>
                                    {
                                        youtubeVideoInfo && (
                                            <Box>
                                                <Typography style={{fontWeight: 'bold'}} gutterBottom variant="subtitle1" component="h3">
                                                    {youtubeVideoInfo.snippet.title}
                                                </Typography>
                                            </Box>
                                        )
                                    }
                                </CardContent>
                                {
                                    youtubeVideoInfo && (
                                        <CardActions disableSpacing>
                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded,
                                                })}
                                                onClick={handleExpandClick}
                                                aria-expanded={expanded}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                    )
                                }
                                {
                                    youtubeVideoInfo && (
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <CardContent style={{paddingLeft: 0, paddingRight: 0}}>
                                                <Typography style={{fontWeight: 'bold'}} gutterBottom variant="subtitle1" component="h3">
                                                    Description
                                                </Typography>
                                                <Typography paragraph>
                                                    {youtubeVideoInfo.snippet.description}
                                                </Typography>
                                            </CardContent>
                                        </Collapse>
                                    )
                                }
                            </Card>
                        )
                    }
                </CardContent>
                <CardActions className={classes.actions}>
                    {
                        submitting ? (
                            <CustomCircularProgress/>
                        ) : (
                            <Button size="medium" color="primary" type="submit" variant="contained">
                                Share
                            </Button>
                        )
                    }
                    <Button size="medium" color="secondary" variant="outlined" onClick={(evt) => {handleResetForm(); handleClearMessages();}}>
                        Clear
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default VideoSharingForm;
