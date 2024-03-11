import UserModel from '../model/users.js'
import BookModel from '../model/books.js'
import Auth from '../helper/auth.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()


const createUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            const userCount = await UserModel.countDocuments();
            const libraryId = `LIB-${userCount + 1}`;
            req.body.password = await Auth.createHash(req.body.password);
            
            // Add libraryId to the user details
            const userDetails = { ...req.body, LibraryId: libraryId };
            
            // Create new user with libraryId
            const newUser = await UserModel.create(userDetails);

            res.status(200).send({
                message: "User created",
                userDetails: newUser
            });
        } else {
            res.status(400).send({
                message: 'User already exists'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({
            message: error.message
        });
    }
};

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await UserModel.findOne({email:email})
        //check if the user exists
        if(user)
        {
            //compare the input password and hash
            if(await Auth.hashCompare(password,user.password))
            {
                //create token
                const token = await Auth.createToken({
                    name:user.name,
                    email:user.email,
                    role:user.role
                })
                res.status(200).send({
                    message:"Login Successfull",
                    token,
                    role:user.role,
                    id:user._id
                })
            }
            else
            {
                res.status(400).send({
                    message:`Incorrect Password`
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with ${req.body.email} does not exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
const getAllUser=async(req,res)=>{
    try{
        const users=await UserModel.find()
        res.status(200).send({
            message:"Users got",
            users:users
        })
    }
    catch(error){
        res.status(400).send({
            error:error.message
        })
    }
}



const getUserById=async(req,res)=>{
    try{
        const user=await UserModel.findById({_id:req.params.id})
        res.status(200).send({
            message:"book data fetched successfully",
            user
        })
    }
    catch(error){
        console.log(error.message)
        res.status(400).send({
            message:"internal server error"
        })
    }
}

const deleteUserById= async(req,res)=>{
    try{
        const user=await UserModel.findById({_id:req.params.id})
        if(user){
            await UserModel.deleteOne({_id:req.params.id})
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
const getBookByIdOrLibraryId = async (req, res) => {
    try {
        const { idOrIsbn } = req.params;
        let book;
        console.log(req.params);
        if (mongoose.Types.ObjectId.isValid(idOrIsbn)) {
            // If the parameter is a valid ObjectId, fetch the book by ID
            book = await BooksModel.findById(idOrIsbn);
        } else {
            // If the parameter is not a valid ObjectId, assume it's an ISBN and fetch the book by ISBN
            book = await BooksModel.findOne({ isbn: idOrIsbn });
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

const getUserByIdOrEmailOrLibraryId = async (req, res) => {
    try {
        const { idOrEmailOrLibraryId } = req.params;
        let user;

        if (mongoose.Types.ObjectId.isValid(idOrEmailOrLibraryId)) {
            // If the idOrEmailOrLibraryId is a valid ObjectId, attempt to find by ID
            user = await UserModel.findById(idOrEmailOrLibraryId);
        } else if (idOrEmailOrLibraryId.includes('@')) {
            // If the idOrEmailOrLibraryId contains '@', attempt to find by email
            user = await UserModel.findOne({ email: idOrEmailOrLibraryId });
        } else {
            // Otherwise, attempt to find by libraryId
            user = await UserModel.findOne({ LibraryId: idOrEmailOrLibraryId });
        }

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Send the user data
        res.status(200).json({
            message: "User data fetched successfully",
            user
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const editUserById= async (req,res)=>{
    try{
        const user=await UserModel.findById({_id:req.params.id})

        if(user){
            user.name=req.body.name
            user.email=req.body.email
            user.password=req.body.password
            user.role=req.body.role
            user.LibraryId=req.body.LibraryId
            user.image=req.bodyimage
            user.bio=req.body.bio
            

            await user.save()
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

const addMyBooks=async(req,res)=>{
    try {
        const { userId, bookId } = req.params;
console.log(userId,bookId)
        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the book exists
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Add the existing book to the user's myBooks array
        user.myBooks.push(book);
        await user.save();

        return res.status(200).json({ message: 'Book added to user\'s myBooks' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const removeMyBooks=async(req,res)=>{
    const { userId, bookId } = req.params;

    try {
        // Find the user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the book exists in the user's myBooks array
        const index = user.myBooks.indexOf(bookId);
        if (index === -1) {
            return res.status(404).json({ error: 'Book not found in user\'s myBooks' });
        }

        // Remove the book from the myBooks array
        user.myBooks.splice(index, 1);

        // Save the updated user
        await user.save();

        return res.json({ message: 'Book removed successfully' });
    } catch (error) {
        console.error('Error removing book:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default{
    createUser,
    loginUser,
    getAllUser,
    getUserById,
    deleteUserById,
    getUserByIdOrEmailOrLibraryId,
    editUserById,
    addMyBooks,
    removeMyBooks
}