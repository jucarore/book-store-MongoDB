'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

// Use the Mongoose ORM for modeling your objects in MongoDB
const mongoose = require('mongoose');
// Use To build Promises
mongoose.Promise = global.Promise;
// Declare the database connection
let db = mongoose.connection;

// If no MONGO environment variable exists, default to localhost
if (!process.env.MONGO) {
    process.env.MONGO = "mongodb://localhost:27017/bookStoreApp";
}

// Listen for events from Mongoose
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB Connected");
});

// Connect to the database using the environment variable
// process.env.MONGO
mongoose.connect(process.env.MONGO);


var config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }


    // Serve the Swagger documents and Swagger UI
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());


    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 10010;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    }
});
