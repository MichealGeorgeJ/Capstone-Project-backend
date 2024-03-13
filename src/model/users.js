import mongoose from "./homePage.js";
import fs from 'fs';

const defaultImageBuffer = fs.readFileSync('src/lib-user.png');

const userSchema=new mongoose.Schema({
        name:{
            type:String,
            
        },
        email:{
            type:String,
           
        },
        password:{
            type:String,
           
        },
        role:{
            type:String,
            default:"user"
        
        },
        LibraryId:{
            type:String,
            default:"LIB-0"
        
        },
       
        image: {
            type:String,
            default:"/public/lib-user.png"
            }
          ,
        bio:{
            type:String,
            default:"bio"
        },
        myBooks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }]
},

{
    collection:'users',
    versionKey:false
})


const UserModel=mongoose.model('users',userSchema)

export default UserModel