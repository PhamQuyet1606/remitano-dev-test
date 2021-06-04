const { admin, db } = require('../../utils/firebase/index');

const getAllVideos = () => {
    return new Promise((resolve) => {
        db
            .collection('videos')
            .get()
            .then((res) => {
                if (res && res.size > 0) {
                    let videos = [];
                    res.forEach((doc) => {
                        let item = {
                            id: doc.id
                        };
                        videos.push({
                            ...item,
                            ...doc.data()
                        });

                    });
                    resolve({isError: false, data: videos});
                } else {
                    resolve({isError: false, data: []});
                }
            })
            .catch((error) => {
                resolve({isError: true, error: error.code});
            })
    });
};

const getVideoById = (vid) => {
    return new Promise((resolve) => {
        db
            .doc(`/videos/${vid}`)
            .get()
            .then((res) => {
                resolve({isError: true, data: res});
            })
            .catch((error) => {
                resolve({isError: true, error: error.code});
            });
    });
};

const addVideo = (video) => {
    return new Promise((resolve) => {
        db
            .collection('videos')
            .add(video)
            .then((doc) => {
                resolve({isError: false, message: "Video is shared successfully!"});
            })
            .catch((error) => {
                resolve({isError: true, error: error.code});
            });
    });
};

module.exports = { getAllVideos, getVideoById, addVideo };
