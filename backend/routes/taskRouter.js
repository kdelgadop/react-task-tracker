import express from "express";
import expressAsyncHandler from "express-async-handler";
import Tasks from "../models/taskModel";

const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
    // console.log('backend accessed');
    try {
        const tasks = await Tasks.find();
        // console.log('about to send the request');
        res.json(tasks);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  })

taskRouter.post('/post', expressAsyncHandler(async (req, res) => {
    // console.log('backend reached for the POST method');
    // console.log(req.body);
    const task = new Tasks({
        text: req.body.text,
        day: req.body.day,
        reminder: req.body.reminder || false  
    });
    // console.log('awaiting to save task');
    const createdTask = await task.save()
    if(!createdTask) {
        res.status(401).send({ message: 'Invalid User Data' })
    } else {
        res.send({
            _id: createdTask._id,
            text: createdTask.text,
            day: createdTask.day,
            reminder: createdTask.reminder,
        })
    }
}));

taskRouter.put('/update/:id', expressAsyncHandler(async (req, res) => {
    const task = await Tasks.findById(req.params.id);
    if(!task) {
        res.status(404).send({ message: 'Task Not Found, refresh the page' })
    } else {
        task.reminder = !task.reminder;
        const updatedTask = await task.save();
        res.send({
            _id: updatedTask._id,
            text: updatedTask.text,
            day: updatedTask.day,
            reminder: updatedTask.reminder,
        })
    }
}));

taskRouter.delete('/delete/:id', getTask, async (req, res) => {
    // console.log('backend entered to delete');
    try {
        console.log(res.taskFound);
        await res.taskFound.remove();
        res.json({ message: 'Task Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);    
    }
});

//Middleware to find a specific task:
async function getTask(req, res, next) {
    let taskFound;
    try {
      taskFound = await Tasks.findById(req.params.id);
      if (taskFound === null) {
        return res.status(404).json({ message: 'Cannor find Task' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.taskFound = taskFound;
    next();
};


export default taskRouter;