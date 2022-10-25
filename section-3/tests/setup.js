require('../models/User');

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise; // to use its built in promise implementation
mongoose.connect(keys.mongoURI, { useMongoClient: true } )