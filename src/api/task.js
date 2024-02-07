import axios from "./axios"
export const getTasksRequest = () => axios.get("/tasks") 
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`) 
export const FormTasks = (user) => axios.post("/tasks",user) 
export const updateTaskRequest = (id,task) => axios.put(`/tasks/${id}`,task) 
export const deleteRequest = (id) => axios.delete(`/tasks/${id}`)