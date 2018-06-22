const config = require('./environments');
const sequelize = require('./models/orm');
const path = require('path');
const normalize = require('normalize-path');

//require('./models/user');

sequelize.sync();

require('./http');