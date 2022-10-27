require('../models/User');
require('../services/login');

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise; // to use its built in promise implementation
mongoose.connect(keys.mongoURI, { useMongoClient: true } )