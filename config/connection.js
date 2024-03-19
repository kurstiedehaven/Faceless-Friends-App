const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api')
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database', err));

module.exports = mongoose.connection;