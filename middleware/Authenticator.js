import model from "../models/auth.model.js";
import jwt from "jsonwebtoken";

export const authenticator = async (req,res,next)=>{
    try {
        const {token} = req.cookies;

        if (!token) {
           return res.status(401).json({messsage:"YOU ARE NOT LOGGED IN"});
        }

        const decodedData = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if (!decodedData) {
        return   res.status(401).json({message:"YOU ARE NOT LOGGED IN"});
        }

        const user = await model.findById(decodedData.id).select("-password");
        req.user=user;
    next();
    } catch (error) {
        console.log("error is in authenticator middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
