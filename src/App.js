import React from "react";
import Header from "./components/Header"
import Tasks from "./components/Tasks";
import { useState, useEffect } from 'react'
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8000/tasks/')
    const data = await response.json()
    // console.log(data);
    return data
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks();
  }, [])


//Delete task
const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8000/tasks/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id})
    })
    } catch (error) {
      console.log(error);
    }
    setTasks(tasks.filter((task) => task._id !== id))
  }

//Toggle Reminder
const toggleReminder = async (id) => {
  // console.log('In the frontend:');
  // console.log(id);
  try {
    const res = await fetch(`http://localhost:8000/tasks/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
    })
    const updatedTask = await res.json()
    // console.log(updatedTask);
    setTasks(tasks.map((task) => {
      if (task._id === id) {
        task = updatedTask
      }
      return task
    }))
  } catch (error) {
    console.log(error);
  }
}

//Add Task
const addTask = async (task) => {
  // console.log("task in the frontend:");
  // console.log(task);
  try {
      const res = await fetch('http://localhost:8000/tasks/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: task.text, day: task.day, reminder: task.reminder || false })
      })
      const newTask = await res.json()
      setTasks([...tasks, newTask])
  } catch (error) {
    console.log(error);
  }
  
}

  return (
    <div className="container">
      <h1>Hello from React</h1>
      <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : <p>You have no Tasks</p>}
    </div>
  );
}

//to serve this, write in the terminal main folder: npx serve -s 8080
//where 8080 is the port
export default App;
