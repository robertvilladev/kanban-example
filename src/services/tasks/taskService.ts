import { BaseQueryResponse, Task, TaskStatus } from "../../types";
import { BASE_API_URL } from "./consts";

export const getTasks = async (): Promise<BaseQueryResponse<Task[]>> => {
  const response = await fetch(`${BASE_API_URL}/tasks`);
  return response.json();
};

export const getTask = async (id: string): Promise<Task> => {
  const response = await fetch(`${BASE_API_URL}/tasks/${id}`);
  const data = await response.json();
  if (!response.ok) 
    throw new Error(data.message);

  return data.response
};

export const createTask = async (
  task: Partial<Task>
): Promise<BaseQueryResponse<Task>> => {
  const response = await fetch(`${BASE_API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (
  task: Partial<Task>
): Promise<BaseQueryResponse<Task>> => {
  console.log(
    "%csrc/services/tasks/taskService.ts:26 JSON.stringify(task)",
    "color: #26bfa5;",
    JSON.stringify(task)
  );
  const response = await fetch(`${BASE_API_URL}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTaskStatus = async ({
  id,
  status,
}: {
  id: string;
  status: TaskStatus;
}): Promise<BaseQueryResponse<Task>> => {
  const task = await getTask(id);
  const updatedTask = { ...task, status };

  console.log(
    "%csrc/services/tasks/taskService.ts:46 updatedTask",
    "color: #26bfa5;",
    updatedTask
  );

  const response = await fetch(`${BASE_API_URL}/tasks/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${BASE_API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
};
