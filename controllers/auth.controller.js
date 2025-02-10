import model from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { tokenSetter } from "../lib/utils.js";

export const register = async (req,res) => {
    const {name , email , password} = req.body;
    
    try {
        if (!name || !email || !password) {
            return res.status(400).json({message : "PLEASE ENTER ALL DETAILS"})
        }

        if (password.length<6) {
           return res.status(400).json({message :"PASSWORD IS SHORT"})
        }

        const user = await model.findOne({email})
         if (user) {
            return res.json({message : "YOU ARE ALREADY AN USER, PLEASE LOGIN"})
         }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await model.create({name,email,password: hashedPassword});
    
    tokenSetter(newUser.id,res);
    const sender = await model.findById(newUser._id).select("-password")

     res.status(201).json(sender);

    } catch (error) {
        console.log("error is in register auth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export const login = async (req,res) => {
    const {email , password} = req.body;

    try {
        if (!email , !password) {
            return res.status(400).json({message:"Please enter all deatils"})
        }

        const user = await model.findOne({email});
        if (!user) {
           return res.status(400).json({message: "Your email or password is incorrect"})
        }
        
        const matched = await bcrypt.compare(password,user.password);

        if (!matched) {
            return res.status(400).json({message:"Your email or password is incorrect"})
        }

        tokenSetter(user._id,res);

        res.status(200).json({
            email:user.email,
            id:user.id,
            name:user.name
        })
    } catch (error) {
        console.log("error is in login auth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" }); 
    }

}


export const logout = async (req,res) => {
     try {
        res.cookie("token","",{
            maxAge:0,
        })

        res.status(200).json({message:"LOGGED OUT"})
     } catch (error) {
        console.log("error is in login auth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
     }
} 