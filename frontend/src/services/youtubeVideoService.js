import defaultAxios from 'axios';
import customAxios from './custom-axios';

const extractYoutubeVideoIdFromURL = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
};

export const getYoutubeVideoInfo = (url) => {
  const videoId = extractYoutubeVideoIdFromURL(url);
  const params = {
      id: videoId,
      key: 'AIzaSyA5YEw2RGvy1ayky2XDPqz-ky2ahd7ttA4',
      part: 'snippet',
  };

    return new Promise((resolve) => {
        defaultAxios.get('https://www.googleapis.com/youtube/v3/videos', {params})
            .then((res) => {
                resolve({isError: false, video: {id: videoId, info: res.data.items[0]}});
            })
            .catch((err) => {
                resolve({isError: true, error: err.message});
            })
    })
};

export const saveVideo = (data) => {
    const body = {
        shared_by: data.user,
        videoId: data.video.id,
        title: data.video.title,
        description: data.video.description,
    };

    return new Promise((resolve) => {
        customAxios({
            method: 'POST',
            data: body,
            url: '/video'
        }).then((res) => {
            resolve({isError: false, data: res.data});
        }).catch((err) => {
            resolve({isError: true, error: err});
        })
    });
};

export const fetchVideos = () => {
    return defaultAxios.get('http://localhost:3100/api/videos');
};


