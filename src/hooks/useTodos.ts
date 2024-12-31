import { Todo } from "@/types/TodoType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTodos = () => {
    const fetchTodos = async (): Promise<Todo[]> => {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
        return data;
    };

    return useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: fetchTodos
    });
};

export default useTodos;
