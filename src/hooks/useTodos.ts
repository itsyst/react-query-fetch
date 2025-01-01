import { Todo } from "@/types/TodoType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTodos = () => {
    const fetchTodos = async (): Promise<Todo[]> => await axios
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.data);

    return useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        staleTime: 10 * 1000,  // 10s Duration (10 seconds) after which fresh data is fetched
    });
};

export default useTodos;
