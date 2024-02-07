import { createContext, useContext, useState } from "react";
import { FormTasks, deleteRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from "../api/task";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useAuth must be used withing an Authprovider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    const res = await FormTasks(task);
    console.log(res);
  };

  const DeleteTask = async (id) => {
    try {
      const res = await deleteRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
 try {
    const res = await getTaskRequest(id)
    return res.data
 } catch (error) {
    console.error(error);
 }
  }
    const UpdateTask = async (id,task) => {
    try {
      const res = await updateTaskRequest(id,task);
      console.log(res);
      //if (res.status === 204) setTasks(tasks.find((task) => task._id === id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider value={{ createTask, getTasks, tasks, DeleteTask, getTask,UpdateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
