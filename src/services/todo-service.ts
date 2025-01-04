import { TodosResponse } from "@/types/TodoType";
import { Todo } from "@/types/TodoType"; // Assuming you have this type defined
import ApiClient from "./api-client";

// Export for individual todo operations
export const todoService = new ApiClient<Todo>('/todos');

// Export for fetching all todos with metadata
export const todosResponseClient = new ApiClient<TodosResponse>('/todos');