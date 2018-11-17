const express = require('express');
const Device = require(`./devices/${process.env.DEVICE || 'kettle'}`);
const device = new Device();

const indexRouter = require('./routes')(device);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
