import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  // console.log(task);
  // console.log("task id in task.js: " + task._id)
    return (
        <div className={task.reminder ? "task reminder" : "task"} onDoubleClick={() => onToggle(task._id)} >
          <h3>{task.text} 
          <FaTimes style={{color: 'red', cursor: 'pointer'}} 
          onClick={() => onDelete(task._id)} /></h3>
          <p>{task.day}</p>
        </div>
    )
}

export default Task
