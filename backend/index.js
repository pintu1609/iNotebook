const  connectToMongo= require('./db')
const express=require('express');
var cors = require('cors')


// connectToMongo();
const port=80;
const app = express();

app.use(cors())

app.use(express.json())

//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port, () => {
console.log(`server start at ${port}`)
})
