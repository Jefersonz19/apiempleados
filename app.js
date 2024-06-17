
const express = require('express');
const app = express();

const bdConnection = require('./configuration/bdconfig');

bdConnection().then((bd) => {
    console.log('Connected successfully');
})

const PORT = 3030;
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});

