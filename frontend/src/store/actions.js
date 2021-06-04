import * as ACTION_TYPES from './actionTypes';

export const auth_init = () => {
    return {
        type: ACTION_TYPES.AUTH_INIT
    }
};
export const auth_success = (token) => {
    return {
        type: ACTION_TYPES.AUTH_SUCCESS,
        payload: token
    }
};
export const auth_failure = (error) => {
    return {
        type: ACTION_TYPES.AUTH_FAILURE,
        payload: error
    }
};
export const un_auth = () => {
    return {
        type: ACTION_TYPES.UN_AUTH,
    }
};

export const fetch_profile_init = () => {
    return {
        type: ACTION_TYPES.FETCH_PROFILE_INIT
    }
};
export const fetch_profile_success = (profile) => {
    return {
        type: ACTION_TYPES.FETCH_PROFILE_SUCCESS,
        payload: profile
    }
};
export const fetch_profile_failure = (error) => {
    return {
        type: ACTION_TYPES.FETCH_PROFILE_FAILURE,
        payload: error
    }
};

export const fetch_videos_init = () => {
    return {
        type: ACTION_TYPES.FETCH_PROFILE_INIT
    }
};
export const fetch_videos_success = (videos) => {
    return {
        type: ACTION_TYPES.FETCH_PROFILE_SUCCESS,
        payload: videos
    }
};
export const fetch_videos_failure = (error) => {
    return {
        type: ACTION_TYPES.FETCH_PROFILE_FAILURE,
        payload: error
    }
};

export const share_video_success = (video) => {
    return {
        type: ACTION_TYPES.FETCH_PROFILE_SUCCESS,
        payload: video
    }
};
export const fetch_video_failure = (error) => {
    return {
        type: ACTION_TYPES.FETCH_PROFILE_FAILURE,
        payload: error
    }
};
