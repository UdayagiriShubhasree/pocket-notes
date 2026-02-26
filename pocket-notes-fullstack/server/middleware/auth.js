
import jwt from "jsonwebtoken";

export default function(req,res,next){
  try{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({msg:"No token"});
    req.user=jwt.verify(token,process.env.JWT_SECRET);
    next();
  }catch{
    res.status(401).json({msg:"Invalid token"});
  }
}
