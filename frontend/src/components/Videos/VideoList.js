import React, {useContext, useEffect, useState} from 'react';
import CustomCircularProgress from "../shared/CustomCircularProgress";
import Grid from "@material-ui/core/Grid";
import {AppContext} from "../../contexts/AppContext";
import {fetchVideos} from "../../services/youtubeVideoService";
import {fetch_videos_success} from "../../actions";
import VideoListItem from "./VideoListItem";

const VideoList = () => {
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        function loadData() {
            setLoading(true);
            fetchVideos()
                .then((res) => {
                    console.log(res.data);
                    dispatch(fetch_videos_success(res.data.data));
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        loadData();
    }, []);

    return (loading ? (
        <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <CustomCircularProgress />
        </div>
    ) : (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    {
                        state.videos.map((video) => (
                            <Grid item xs={12}>
                                <VideoListItem video={video} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    ));
};

export default VideoList;
