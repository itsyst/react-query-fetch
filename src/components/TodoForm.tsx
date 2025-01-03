import { useRef } from 'react';

interface AddTodoContext {
	previousTodos: TodosResponse | undefined;
}

import {
	Button,
	Fieldset,
	HStack,
	Input,
	Spinner,
	Text
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Todo, TodosResponse } from '@/types/TodoType';

const TodoForm = () => {
	const pageSize = 10;
	const ref = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();
	const {
		mutate: addTodo,
		error,
		isError,
		isPending: isMutating
	} = useMutation<Todo, Error, Todo, AddTodoContext>({
		mutationFn: (newTodo: Todo) =>
			axios
				.post<Todo>('https://jsonplaceholder.typicode.com/todosw', newTodo)
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
			if (ref.current) ref.current.value = '';

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
		onError: (error, newTodo, context) => {
			if (!context) return;
			//APPROACH: Rollback the cache to the previous state
			queryClient.setQueryData<TodosResponse>(
				['todos', { page: 1, pageSize: pageSize }],
				context.previousTodos
			);
		}
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (ref.current && ref.current.value) {
					// addTodo.mutate({
					// 	id: 0,
					// 	userId: 1,
					// 	title: ref.current.value,
					// 	completed: false
					// });
					addTodo({
						id: 0,
						userId: 1,
						title: ref.current.value.trim(),
						completed: false
					});
				}
			}}
		>
			<Fieldset.Root size="lg" color={'white'} mt={2} mb={4}>
				<HStack>
					<Input ref={ref} name="name" />
					<Button
						type="submit"
						alignSelf="flex-start"
						color={'white'}
						bg={isMutating ? 'gray.400' : 'blue.400'}
						disabled={isMutating}
					>
						{isMutating ? <Spinner size="sm" /> : 'Add'}
					</Button>
				</HStack>
				{isError && error instanceof Error && (
					<Text color="red.500" mt={2} fontSize="sm">
						{error.message}
					</Text>
				)}
			</Fieldset.Root>
		</form>
	);
};

export default TodoForm;
