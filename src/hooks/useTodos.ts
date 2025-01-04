import {todosResponseClient} from "@/services/todo-service";
import { TodosResponse } from "@/types/TodoType";
import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
 
interface QueryTodos {
    page: number;
    pageSize: number;
}

const useTodos = (query: QueryTodos) => {
    const fetchTodos = async (): Promise<TodosResponse> => {
        const { data, headers } = await todosResponseClient.getAllWithMeta({
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
        });

        // Extract the total count from headers or other means
        // The 10 means that the conversion is happening in decimal format(base 10).
        const totalItems = parseInt(headers['x-total-count'] || '0', 10);
        const totalPages = Math.ceil(totalItems / query.pageSize);

        // return { data: Array.isArray(data) ? [...data] : [], meta: { totalPages } };

        // Convert data to an array if it isn't already
        const todoData = Array.isArray(data) ? [...data] : [];

        return { data: todoData, meta: { totalPages } };

    };

    return useQuery<TodosResponse, Error>({
        queryKey: ['todos', query],
        queryFn: fetchTodos,
        staleTime: 10 * 60 * 1000, // 10 minutes Because the data is not expected to change frequently (fake API)
        keepPreviousData: true,  // Keep previous data when fetching new data
        placeholderData: keepPreviousData
    } as UseQueryOptions<TodosResponse, Error>);
};

export default useTodos;
