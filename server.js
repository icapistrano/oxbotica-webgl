// boiler plate to serve static files

const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static('src'));

app.listen(PORT, () => console.log('Server started at http://localhost:' + PORT));