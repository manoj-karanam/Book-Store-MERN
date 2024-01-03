import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/BookModel.js '
import booksRoute from './Routes/booksRoute.js'

const app= express();
app.use(express.json()) 

app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`)
})

app.use('/books',booksRoute)

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send('welcome to MERN Project Page')

})



mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to Database')
})
.catch((error)=>{
    console.log(error)
})

