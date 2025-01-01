import { Todo } from "@/types/TodoType";
import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

interface QueryTodos {
    page: number;
    pageSize: number;
}

const useTodos = (query: QueryTodos) => {
    const fetchTodos = async (): Promise<Todo[]> => await axios
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
            params: {
                _start: (query.page - 1) * query.pageSize,
                _limit: query.pageSize,
            },
        })
        .then((response) => response.data);

    return useQuery<Todo[], Error>({
        queryKey: ['todos', query],
        queryFn: fetchTodos,
        staleTime: 10 * 1000,  // 10s Duration (10 seconds) after which fresh data is fetched
        keepPreviousData: true,  // Keep previous data when fetching new data
        placeholderData: keepPreviousData
    } as UseQueryOptions<Todo[], Error>);
};

export default useTodos;
