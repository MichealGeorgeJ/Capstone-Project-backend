import mongoose from "./homePage.js";

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Name is required"]
    },
    author:{
        type:String,
        required:[true,"Email is required"],
       
    },
    isbn:{
        type:String,
        required:[true,"isbn is required"]
    },
    publicationDate:{
        type:String,
        required:[true,"publicationDate is required"],
    },
    dob:{
        type:String,
        required:[true,"DoB is required"],
    },
    bio:{
        type:String,
        required:[true,"Bio is required"],
    },
    image:{
        type:String,
        required:[true,"Image Url is required"],
    },
    category:{
        type:String,
        required:[true,"Image Url is required"],
    },
    returnStatus:{
        type:Boolean,
        default:true
    },
    renewalStatus:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date,
        default:new Date()
        
    },
    
},
{
    collection:'books',
    versionKey:false
})

const BookModel=mongoose.model('books',bookSchema)

export default BookModel 