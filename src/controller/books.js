import mongoose from 'mongoose'
import BooksModel from '../model/books.js'
import dotenv from 'dotenv'
dotenv.config()


const getAllBooks=async (req,res)=>{
    try{
        const books=await BooksModel.find()
        res.status(200).send({
            message:"Books data fetched sucessfully",books
        })
    }
    catch(error){
        res.status(400).send({
            message:error.message
        })
    }
}


const getBookByIdOrIsbn = async (req, res) => {
    try {
        const { idOrIsbn } = req.params;
        let book;
        
        // Regular expression to validate ISBN format
        const isbnRegex = /^(?:ISBN(?:-1[03])?:? )?(?=[-0-9X]{17}$|[-0-9X]{13}$|[0-9X]{10}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9X]$/i;

        // Check if the input matches the ISBN format
        const isIsbn = isbnRegex.test(idOrIsbn);

        if (mongoose.Types.ObjectId.isValid(idOrIsbn)) {
            // If the parameter is a valid ObjectId, fetch the book by ID
            book = await BooksModel.findById(idOrIsbn);
        } else if (isIsbn) {
            // If the parameter is a valid ISBN, fetch the book by ISBN
            book = await BooksModel.findOne({ isbn: idOrIsbn });
        } else {
            // If the parameter is neither a valid ObjectId nor a valid ISBN
            throw new Error("Invalid ID or ISBN");
        }

        // Check if a book was found
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Send the book data
        res.status(200).json({
            message: "Book data fetched successfully",
            book
        });
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};



const addBook=async (req,res)=>{
    try{
        // const book=await BooksModel.findOne({isbn:req.body.isbn})
       
            const newBook =await BooksModel.create(req.body)
            res.status(200).send({
                message:"Books added successfully"
            })
         
    }
    catch(error){
        console.log(error.message)
        res.status(400).send({
            message:"book already exists"
        })
    }
}

const editBookById= async (req,res)=>{
    try{
        const book=await BooksModel.findById({_id:req.params.id})

        if(book){
            book.title=req.body.title
            book.author=req.body.author
            book.isbn=req.body.isbn
            book.category=req.body.category
            book.publicationDate=req.body.publicationDate
            book.dob=req.body.dob
            book.bio=req.body.bio
            book.image=req.body.image

            await book.save()
            res.status(200).send({
                message:"book data edited successfully"
            })
        }
    }
    catch(error){
        res.status(400).send({
            message:"Invalid book"
        })
    }
}

const deleteBookById= async(req,res)=>{
    try{
        const book=await BooksModel.findById({_id:req.params.id})
        if(book){
            await BooksModel.deleteOne({_id:req.params.id})
            res.status(200).send({
                message:"book deleted successfully"
            })
        }
    }
    catch(error){
        res.status(400).send({
            message:"internal server error"
        })
    }
}


const changeReturnStatus = async (req, res) => {
    try {
        const book = await BooksModel.findById(req.params.id);
        
        if (book) {
            book.returnStatus = req.body.returnStatus;
            await book.save();
            console.log(book);
            res.status(200).send({
                message: "Book returnStatus updated successfully"
            });
        } else {
            res.status(404).send({
                message: "Book not found"
            });
        }
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
}
const changeDueDate=async(req,res)=>{
    try{
        const book=await BooksModel.findById({_id:req.params.id})
        if(book){
            BooksModel.updateOne({_id:req.params.id},{$set:{dueDate:req.dueDate}})
            res.status(200).send({
                message:"book dueDate updated successfully"
            })
        }
    }
    catch(error){
        res.status(400).send({
            message:"internal server error"
        })
    }
    

}

const changeStatusAndDueDate = async (req, res) => {
    try {
        const book = await BooksModel.findById(req.params.id);
        
        if (!book) {
            return res.status(404).send({
                message: "Book not found"
            });
        }
        
        if (req.body.returnStatus !== undefined) {
            book.returnStatus = req.body.returnStatus;
        }
        
        if (req.body.renewalStatus !== undefined) {
            book.renewalStatus = req.body.renewalStatus;
        }
        
        if (req.body.dueDate !== undefined && req.body.renewalStatus !== undefined) {
            book.dueDate = req.body.dueDate
            book.renewalStatus = req.body.renewalStatus
        }

        await book.save();
        console.log(book);
        res.status(200).send({
            message: "Book updated successfully"
        });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
}
const getBookByIsbn=async(req,res)=>{
    try{
        const { isbn } = req.params;
        const book=await BooksModel.findOne({isbn})
        res.status(200).send({
            message:"book data fetched successfully",
            book
        })
    }
    catch(error){
        console.log(error.message)
        res.status(400).send({
            message:"internal server error"
        })
    }
}

export default{
    getAllBooks,
    getBookByIdOrIsbn,
    addBook,
    editBookById,
    deleteBookById,
    changeStatusAndDueDate,

}