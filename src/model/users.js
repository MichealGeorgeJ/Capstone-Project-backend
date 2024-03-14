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
            default:"https://cdn3.iconfinder.com/data/icons/user-icon-3-1/100/user_3_Artboard_1-1024.png"
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