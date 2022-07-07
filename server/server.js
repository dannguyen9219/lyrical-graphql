const express = require('express');
const models = require('./models');
const { graphqlHTTP }= require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();

// Replace with your mongoLab URI
// const MONGO_PORT = 27017;

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// const MONGO_URI = `mongodb+srv://dannguyen9219:PiALF14gBNsaCZ13@lyricalgraphql.yozehjv.mongodb.net/?retryWrites=true&w=majority`;

if (!DATABASE_URL) {
  throw new Error('You must provide a MongoDB URI!');
}

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, CONFIG);
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', error => console.log('Error connecting to MongoDB instance:', error));

app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
