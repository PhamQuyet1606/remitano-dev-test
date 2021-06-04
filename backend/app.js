const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');

global.__basedir = __dirname;
const port = process.env.PORT || 3100;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRoute);
// app.get('/api/test', function(req, res, next) {
//     res.send("test");
// });

app.listen(port, () => console.log(`Listening on port ${port}`));


module.exports = app;
