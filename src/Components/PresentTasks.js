import { useState, useEffect } from "react";
import deleteTask from "../functions/deleteTask";

const PresentTasks = ({ taskAdded, setTaskAdded, type, active, setActive }) => {
  const [tasks, addTask] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
// get the data from local storage and store it in state
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("tasks"));
    if (storage){
        setActive('active')
        switch(type) {
            case 'todo':
                 const todos = storage.filter(ele => ele.checked === false) 
                 addTask(todos)
                 break;
            case 'done':
                const done = storage.filter(ele => ele.checked === true) 
                addTask(done) 
                break;
            default: 
            addTask(storage); 
        }
    }else addTask(storage)
    return () => {
      console.log("cancelled");
    };
  }, [taskAdded, isChecked, type, setActive]);
  // add checked task to the state
  const handleChange = (key, value) => {
    const storage = JSON.parse(localStorage.getItem("tasks"));
    const element = storage.filter((ele) => ele.id === Number(key));
    // save checked tasks in local storage
    setIsChecked(!isChecked);
    element[0].checked = value;
    return localStorage.setItem("tasks", JSON.stringify(storage));
  };
  if (tasks) { // present elements that brought from local storage
    return tasks.map((ele) => {
      return (
        <li key={ele.id}>
          {ele.task}
          <span>
            <input
              type="checkbox"
              id={ele.id.toString()}
              checked={ele.checked}
              onChange={(e) => handleChange(e.target.id, e.target.checked)}
            />
          </span>
          <span className="icon" onClick={() => {
              deleteTask(ele.id, taskAdded, setTaskAdded)
          }}>
            <i className="fas fa-trash"></i>
          </span>
        </li>
      );
    });
  } else {
      // if there is no tasks 
    return <li>add tasks to show them here </li>;
  }
};

export default PresentTasks;
