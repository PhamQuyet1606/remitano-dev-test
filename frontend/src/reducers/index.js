import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
    videos: [],
    recentSharedVideos: [],
    profile: {
        email: '',
        uid: '',
    },
    auth: '',
    authenticated: false,
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUTH_INIT:
            let storedToken = localStorage.getItem('auth') || '';
            return {
                ...state,
                auth: storedToken,
                authenticated: !!storedToken
            };
        case ACTION_TYPES.AUTH_SUCCESS:
            localStorage.setItem('auth', action.payload);
            return {
                ...state,
                auth: action.payload,
                authenticated: true,
                error: null,
            };
        case ACTION_TYPES.AUTH_FAILURE:
            return {
                ...state,
                error: action.payload,
                authenticated: false,
            };
        case ACTION_TYPES.UN_AUTH:
            localStorage.setItem('auth', initialState.auth);
            localStorage.setItem('profile', JSON.stringify(initialState.profile));
            return {
                ...state,
                videos: [],
                recentSharedVideos: [],
                profile: {
                    email: '',
                    uid: '',
                },
                auth: '',
                authenticated: false,
            };
        case ACTION_TYPES.FETCH_PROFILE_INIT:
            let storedProfile = localStorage.getItem('profile');
            return {
                ...state,
                error: null,
                profile: storedProfile ? JSON.parse(storedProfile) : initialState.profile,
            };
        case ACTION_TYPES.FETCH_PROFILE_SUCCESS:
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return {
                ...state,
                profile: action.payload,
                error: null,
            };
        case ACTION_TYPES.FETCH_PROFILE_FAILURE:
            return {
                ...state,
                profile: initialState.profile,
                error: action.payload,
            };
        case ACTION_TYPES.FETCH_VIDEOS_INIT:
            let storedVideos = localStorage.getItem('videos');
            return {
                ...state,
                error: null,
                videos: storedVideos ? JSON.parse(storedVideos) : null,
            };
        case ACTION_TYPES.FETCH_VIDEOS_SUCCESS:
            return {
                ...state,
                error: null,
                videos: action.videos
            };
        case ACTION_TYPES.FETCH_VIDEOS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case ACTION_TYPES.SHARE_VIDEO_SUCCESS:
            return {
                ...state,
                error: null,
                recentSharedVideos: [...state.recentSharedVideos, ...action.payload],
            };
        case ACTION_TYPES.SHARE_VIDEO_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state
    }
}
