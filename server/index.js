const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 3001)

// Middlewares
app.use(express.json());
app.use(cors())

// Routes
fs.readdir('./controllers', (err, files) => {
    if (err) {
        console.error(err)
        return
    }
    files.forEach(file => {
        app.use(require('./controllers/' + file));
    });
})

//Starting the server
app.listen(app.get('port'), () => {
    console.log("App Listen at port", app.get('port'));
})