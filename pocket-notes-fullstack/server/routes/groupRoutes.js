
import express from "express";
import Group from "../models/Group.js";
import auth from "../middleware/auth.js";

const router=express.Router();

router.post("/", auth, async(req,res)=>{
  const g=await Group.create({...req.body,userId:req.user.id});
  res.json(g);
});

router.get("/", auth, async(req,res)=>{
  res.json(await Group.find({userId:req.user.id}));
});

export default router;
