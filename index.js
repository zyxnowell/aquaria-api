require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var aquariaRoutes = require('./controllers/aquariaController');


var app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3007'
}));
app.listen(4000, () => console.log('Server started at : 4000'));


app.use('/aquaria', aquariaRoutes);