import { Todo, TodosResponse } from "@/types/TodoType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface AddTodoContext {
    previousTodos: TodosResponse | undefined;
}

const useAddTodo = (onAdd: () => void) => {
    const pageSize = 10;
    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: (newTodo: Todo) =>
            axios
                .post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
                .then((res) => res.data),
        onMutate: (newTodo) => {
            //APPROACH: Storing the previous state before updating the cache
            const previousTodos = queryClient.getQueryData<TodosResponse>([
                'todos',
                { page: 1, pageSize }
            ]);

            queryClient.setQueryData<TodosResponse>(
                ['todos', { page: 1, pageSize: pageSize }],
                (todos) => ({
                    data: [newTodo, ...(todos?.data || [])],
                    meta: todos?.meta
                })
            );

            // if (ref.current) ref.current.value = ''; 
            // instead of this, we can call the onAdd callback function
            onAdd();

            return { previousTodos };
        },
        onSuccess: (savedTodo, newTodo) => {
            //APPROACH: Invalidating the cache to refetch the data
            // queryClient.invalidateQueries({ queryKey: ['todos'] });
            //APPROACH: Optimistic Update, updating the cache with the new data directly ("hackish" approach)
            queryClient.setQueryData<TodosResponse>(
                ['todos', { page: 1, pageSize: pageSize }],
                (todos) => ({
                    data:
                        todos?.data?.map((todo) => (todo === newTodo ? savedTodo : todo)) ||
                        [],
                    meta: todos?.meta
                })
            );
        },
        onError: (_error, _newTodo, context) => {
            if (!context) return;
            //APPROACH: Rollback the cache to the previous state
            queryClient.setQueryData<TodosResponse>(
                ['todos', { page: 1, pageSize: pageSize }],
                context.previousTodos
            );
        }
    });
}

export default useAddTodo;