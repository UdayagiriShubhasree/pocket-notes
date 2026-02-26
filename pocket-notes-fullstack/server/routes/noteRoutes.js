
import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router=express.Router();

router.post("/", auth, async(req,res)=>{
  res.json(await Note.create({...req.body,userId:req.user.id}));
});

router.get("/:groupId", auth, async(req,res)=>{
  res.json(await Note.find({groupId:req.params.groupId}));
});

export default router;
