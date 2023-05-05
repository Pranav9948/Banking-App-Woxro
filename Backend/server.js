const express = require('express')
const app = express()
const userRoute = require('./Routes/userRoutes');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config('./env');

const port =5000


const dbConfig = require("../Backend/config/dbConfig");

app.use(express.json());



app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization']
}));





app.use("/api/user",userRoute);





app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

