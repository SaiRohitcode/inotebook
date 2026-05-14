const connectToMongo = require('./db');
connectToMongo();

// this is from expressjs.com
const express = require('express')
const app = express()
const port = 5000

var cors = require('cors')

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors())

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
  console.log(`iNotebook listening on port ${port}`)
})

