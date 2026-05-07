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

//for this set the json in thunderclient as
// body -> json -> {"name" : "harry"}
//set the header -> content-type = application/json
app.use(express.json())

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