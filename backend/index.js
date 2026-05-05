const connectToMongo = require('./db');
connectToMongo();

// this is from expressjs.com
const express = require('express')
const app = express()
const port = 3000

// Available routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//npm install mongoose
//npm install -g nodemon
//nodemon -v
//npm i -D nodemon in terminal to install
//nodemon .\index.js to automatically run