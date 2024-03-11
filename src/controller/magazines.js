import MagazinesModel from "../model/magazines.js"
import dotenv from 'dotenv'
dotenv.config()

const getAllMagazines=async(req,res)=>{
    try{
        const magazines=await MagazinesModel.find()
        res.status(200).send({
            message:'Magazines fetched successfully',magazines
        })
    }
    catch(error){
        res.status(400).send({
            message:error.message
        })
    }
}

const addMagazines=async (req,res)=>{
    try{
       
            const newMagazine =await MagazinesModel.create(req.body)
            res.status(200).send({
                message:"Books added successfully"
            })
         
    }
    catch(error){
        console.log(error.message)
        res.status(400).send({
            message:"Magazines already exists"
        })
    }
}
const deleteMagazineById= async(req,res)=>{
    try{
        const magazine=await MagazinesModel.findById({_id:req.params.id})
        if(magazine){
            await MagazinesModel.deleteOne({_id:req.params.id})
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
export default{
    getAllMagazines,
    addMagazines,
    deleteMagazineById

}