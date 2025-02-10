import jwt from "jsonwebtoken";

export const tokenSetter = (id , res) => {
    const token = jwt.sign({id : id },process.env.JWT_SECRET_KEY);
    res.cookie("token",token,{
        httpOnly : true,
        sameSite:"none",
        maxAge:15 * 60 * 1000,
        secure: process.env.DEV_ENV === "production"? true : false,
    })
}