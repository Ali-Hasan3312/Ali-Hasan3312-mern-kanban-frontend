import api from "./api"

export const createTask = async (taskData) => {
    const response = await api.post("/tasks", taskData, {
        headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
}

export const getTasks = async ()=> {
    const response = await api.get("/tasks")
    return response.data;
}

export const updateTask = async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}
export const deleteTask = async (taskId) => {
    console.log(`Deleting task with ID: ${taskId}`);
    
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
}