import express, { response } from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/BookModel.js '

const app= express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(234).send(`<h1>welcome to mern stack tutorial</h1>`)
})

app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`)
})

//display all the books
app.get('/books',async(req,res)=>{
    try{
        const books= await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        })
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// get book by id
app.get('/books/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const book= await Book.findById(id);
        return res.status(200).json(book)
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

app.put('/books/:id',async(req,res)=>{
    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishyear){
                return res.status(400).send({
                    message:'Send all required fields:title,author,publishYear'
                });
            }
        const {id} = req.params
        const result =await Book.findByIdAndUpdate(id,req.body);

        if (!result){
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).send({message:'Book updated successfully'})
         
    }
    catch(error){
        console.log(error)
    }
})

//route to save a new book
app.post('/books',async(req,res)=>{
    try{
        if(!req.body.title||!req.body.author||!req.body.publishyear){
            return res.status(400).send({
                message:'send all required fields: title,author,publishyear'});
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishyear:req.body.publishyear
        }
        const book=await Book.create(newBook);
        return res.status(201).send(book)
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

app.delete('/books/:id', async(req,res)=>{
    try{
        const {id} = req.params

        const result=await Book.findByIdAndDelete(id);

        if (!result){
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).send({message:'Book deleted successfully'})
    
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to Database')
})
.catch((error)=>{
    console.log(error)
})

