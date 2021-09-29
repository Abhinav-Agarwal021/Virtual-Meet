const express = require('express');
const dbConnect = require('./Database');
require('dotenv').config();
const routes = require('./Routes/Router')
var cors = require("cors")

const app = express();

dbConnect()

const corsOption = {
    credentials: true,
    origin: 'http://localhost:3000',
};

app.use(cors(corsOption));
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hi...")
})

app.listen(PORT, () => {
    console.log("server is running at port " + PORT)
})