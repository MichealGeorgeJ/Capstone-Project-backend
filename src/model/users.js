import mongoose from "./homePage.js";
const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required:[true,"Name is required"]
        },
        email:{
            type:String,
            required:[true,"Email is required"]
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        role:{
            type:String,
            default:"user"
        
        },
        LibraryId:{
            type:String,
            default:"LIB-0"
        
        },
        image:{
            type:String,
            default:"/public/lib-user.png"
        },
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