require('./configs/db/withoutTLS')

const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: false }))

process.on('uncaughtException', (exception) => {
    console.log('Uncaught exception occurred')
    console.log(exception)
    process.exit(0)
})

app.use("/", (req, res) =>
    res.status(200).json({ msg: "Server is up and running" })
);

module.exports = app