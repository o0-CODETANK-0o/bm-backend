const express =require("express")
const router=express.Router()

const {postContact}=require("../controllers/ModelController")




router.route("/")

.post(postContact)

module.exports=router