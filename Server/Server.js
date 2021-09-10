const express = require('express');
require('dotenv').config();
const routes = require('./Routes/Router')


const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hi...")
})

app.listen(PORT, () => {
    console.log("server is running at port " + PORT)
})