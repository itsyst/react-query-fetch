export interface Todo {
    id: number
    title: string
    userId: number;
    completed: boolean
}

export interface TodosResponse {
    data: Todo[];
    meta?: {
        totalPages: number;
    };
}