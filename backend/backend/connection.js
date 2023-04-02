const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "sql123",
    database: "over_the_shop"
})

module.exports = client
