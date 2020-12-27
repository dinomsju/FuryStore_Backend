const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require('body-parser');

// import Route
const userRoute = require('./routes/routes.user');
const productRoute = require('./routes/routes.product');

const app = express();

const dbUrl = 'mongodb+srv://dinomsju:456852@cluster0.eezyy.mongodb.net/StoreApp?retryWrites=true&w=majority';
// //Connect to DB
const db = mongoose.connection;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, });

db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    console.log('Kết nối thành công đến DB!');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});

// Use Route
app.use('/api', userRoute);
app.use('/api/products', productRoute);