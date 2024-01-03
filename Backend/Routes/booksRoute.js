import express from "express";
import {Book} from '../models/BookModel.js';

const router=express.Router()


//display all the books
router.get('/',async(req,res)=>{
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
router.get('/:id',async(req,res)=>{
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

//route to update a book
router.put('/:id',async(req,res)=>{
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
router.post('/',async(req,res)=>{
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

//route to delete a book
router.delete('/:id', async(req,res)=>{
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

export default router;
