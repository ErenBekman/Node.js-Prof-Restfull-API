const express = require('express');
const fileupload = require('express-fileupload');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');
const { ProjectRoutes, UserRoutes } = require('./routes');
const path = require('path');

config();
loaders();
events();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, './', 'uploads')));
app.use(express.json());
app.use(helmet());
app.use(fileupload());

app.listen(process.env.APP_PORT, () => {
   console.log('server have started..');
   app.use('/projects', ProjectRoutes);
   app.use('/users', UserRoutes);
});
