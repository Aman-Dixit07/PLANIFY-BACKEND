import todoModel from "../models/todo.model.js"

export const createTask = async (req,res) =>{
    const {task} = req.body;

    try {
        if (!task) {
            return res.status(400).json({message:"PLEASE GIVE THE TASK"})
        }

        const todo = await todoModel.create({
            task,
            creator:req.user._id,
        })
        return res.status(201).json({message:"TASK CREATED SUCCESFULLY"});
    } catch (error) {
        console.log("error is in TASK create controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getTask = async (req,res) =>{
 return res.json({message:"TASKS"});
}

export const deleteTask = async (req,res) =>{

}

export const updateTask = async (req,res)  =>{

}