require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/product')
//express app
const app = express()

//middle ware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/products' , productRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('connected to the db & listening for requests on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  }) 


process.env