import { useRef } from 'react';
import { Button, Fieldset, HStack, Input, Spinner, Text } from '@chakra-ui/react';
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
	} = useMutation<Todo, Error, Todo>({
		mutationFn: (newTodo: Todo) => axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo).then((res) => res.data),
		onSuccess: (savedTodo) => {
			//APPROACH: Invalidating the cache to refetch the data
			// queryClient.invalidateQueries({ queryKey: ['todos'] });
			//APPROACH: Optimistic Update, updating the cache with the new data directly ("hackish" approach)
			queryClient.setQueryData<TodosResponse>(['todos', { page: 1, pageSize: pageSize }], (todos) => ({
				data: [savedTodo, ...(todos?.data || [])],
				meta: todos?.meta
			}));
			ref.current!.value = '';
		},
		onError: (error) => {
			console.error('Failed to add todo:', error);
			// Handle error in UI if necessary
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
					<Button type="submit" alignSelf="flex-start" color={'white'} bg={isMutating ? 'gray.400' : 'blue.400'} disabled={isMutating}>
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
