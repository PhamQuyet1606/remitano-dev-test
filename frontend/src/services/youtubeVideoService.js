import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
});

const extractYoutubeVideoIdFromURL = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
};

export const getYoutubeVideoInfo = (url) => {
  const videoId = extractYoutubeVideoIdFromURL(url);
    console.log(videoId);
  const params = {
      id: videoId,
      key: 'AIzaSyA5YEw2RGvy1ayky2XDPqz-ky2ahd7ttA4',
      part: 'snippet',
  };

    return new Promise((resolve) => {
        axiosInstance.get('/videos', {params})
            .then((res) => {
                console.log(res.data);
                resolve({isError: false, video: {url: `https://www.youtube.com/embed/${videoId}`, info: res.data.items[0]}});
            })
            .catch((err) => {
                console.log(err);
                resolve({isError: true, error: err});
            })
    })
};


