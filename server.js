require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRoutes');

// express app

const app = express();

// moddleware

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//  routes

app.use('/product', productRoutes);
app.use('/user', userRoutes);

// connect to db

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log(`listening to port `, process.env.PORT);
        });
    })
    .catch((err) => console.log(err));
