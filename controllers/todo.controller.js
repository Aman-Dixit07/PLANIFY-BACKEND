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
    try {
        const tasks = await todoModel.find({
            creator:req.user._id,
        });

        return res.status(200).json(tasks);   
    } catch (error) {
        console.log("error is in GETTASK controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }

}

export const deleteTask = async (req,res) =>{
    const { id: taskId} =   req.params;
    
    try {
        await todoModel.findByIdAndDelete(taskId);

        return res.status(200).json({message:"TASK DELETED SUCCESFULLY"})
    } catch (error) {
        console.log("error is in TASK delete controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateTask = async (req,res)  =>{
    try {
        const { id: taskId } = req.params;
        const todo = await todoModel.findById(taskId);
    
        if (!todo) {
          return res.status(400).json({ message: "task does not exist" });
        }
    
        todo.isComplete = !todo.isComplete;
    
        await todo.save();
    
        return res.status(200).json({ message: "status upadated successfully" });
      } catch (error) {
        console.log("error is in isCompleted todo controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}