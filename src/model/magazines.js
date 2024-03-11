import mongoose from './homePage.js'

const MagazinesSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Name is required"]

    },
    publicationDate:{
        type:String,
        required:[true,"Publication is required"]
    },
    image:{
        type:String,
        required:[true,"Image URL is required"]
    }


},
{
    colloction:'magazines',
    versionKey:false
})

const MagazinesModel=mongoose.model('magazines',MagazinesSchema)

export default MagazinesModel