const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authAPIRouters = require('./routes/auth');
const videoAPIRouters = require('./routes/video');

const authRoute = express.Router();
const videoRoute = express.Router();

global.__basedir = __dirname;
const port = process.env.PORT || 3100;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

authRoute.post('/api/checkAuth', authAPIRouters.doAuthCheck);
authRoute.post('/api/auth', authAPIRouters.doAuth);
authRoute.get('/api/profile', authAPIRouters.doAuthCheck, authAPIRouters.fetchProfile);

videoRoute.get('/api/videos', videoAPIRouters.fetchVideos);
videoRoute.post('/api/video', authAPIRouters.doAuthCheck, videoAPIRouters.postVideo);

app.use(authRoute);
app.use(videoRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));


module.exports = app;
