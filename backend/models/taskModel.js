import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
        text: { type: String, required: true },
        day: {type: String, required: true},
        reminder: { type: Boolean, required: false }
});

const Tasks = mongoose.model('tasks', userSchema);
export default Tasks;