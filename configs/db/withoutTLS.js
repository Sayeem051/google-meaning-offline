require('dotenv').config()
const mongoose = require('mongoose')

mongoose
    .connect(process.env.DB_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true
    }).then(() => {
        console.log('MongoDB Connected')
    }).catch((error) => {
        console.log(error.message)
        console.log('Something went wrong')
    })