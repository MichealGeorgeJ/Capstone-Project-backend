import IssuedBooksModel from '../model/issuedBooks.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const addBook=async (req,res)=>{
    try{
        // const book=await BooksModel.findOne({isbn:req.body.isbn})
       
            const newBook =await IssuedBooksModel.create(req.body)
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

const getAllBooks=async (req,res)=>{
    try{
        const books=await IssuedBooksModel.find()
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
const deleteBookById= async(req,res)=>{
    try{
        const book=await IssuedBooksModel.findById({_id:req.params.id})
        if(book){
            await IssuedBooksModel.deleteOne({_id:req.params.id})
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
const getBookByLibraryIdAndIsbn = async (req, res) => {
    try {
        const { libraryId, isbn } = req.params;
        
        
        const book = await IssuedBooksModel.findOne({ libraryId, isbn });
        console.log(book)
        if (!book) {
            return res.status(404).send({
                message: "Book not found"
            });
        }
        
        return res.status(200).send({
            message: "Book data fetched successfully",
            book
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};
const getBookByIdOrIsbn = async (req, res) => {
    try {
        const { idOrIsbn } = req.params;
        let book;
        console.log(req.params);
        if (mongoose.Types.ObjectId.isValid(idOrIsbn)) {
            // If the parameter is a valid ObjectId, fetch the book by ID
            book = await IssuedBooksModel.findById(idOrIsbn);
        } else {
            // If the parameter is not a valid ObjectId, assume it's an ISBN and fetch the book by ISBN
            book = await IssuedBooksModel.findOne({ isbn: idOrIsbn });
        }
        console.log(idOrIsbn)
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
const changeStatusAndDueDate = async (req, res) => {
    try {
        const book = await IssuedBooksModel.findById(req.params.id);
        
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

const getBookByIdOrLibraryId = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is in the correct format (ObjectId)
        if (mongoose.Types.ObjectId.isValid(id)) {
            // If the provided ID is valid, search by _id and return only one book
            const book = await IssuedBooksModel.findById(id);
            if (book) {
                return res.status(200).send({
                    message: "Book data fetched successfully",
                    book
                });
            }
        } else {
            // If the provided ID is not a valid ObjectId, search by libraryId and return all books
            const booksByLibraryId = await IssuedBooksModel.find({ libraryId: id });
            if (booksByLibraryId && booksByLibraryId.length > 0) {
                return res.status(200).send({
                    message: "Books data fetched successfully",
                    books: booksByLibraryId
                });
            }
        }

        // If no book is found with the provided _id or libraryId, send a 404 response
        return res.status(404).send({
            message: "Book(s) not found"
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};



export default {
    addBook,
    getAllBooks,
    deleteBookById,
    getBookByLibraryIdAndIsbn,
    changeStatusAndDueDate,
    getBookByIdOrLibraryId,
   
}