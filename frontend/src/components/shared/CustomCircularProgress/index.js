import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import customCircularProgressStyles from "./customCircularProgressStyles";

function CustomCircularProgress(props) {
    const classes = customCircularProgressStyles();

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </div>
    );
};

export default CustomCircularProgress;
