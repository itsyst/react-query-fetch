import { useState } from 'react';
import { Button, Heading, HStack, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/types/TodoType';
import useTodos from '@/hooks/useTodos';
import TodoForm from './TodoForm';

const Todos = () => {
	const pageSize = 10;
	const [page, setPage] = useState(1);
	const { data: todos, error, isLoading } = useTodos({ page, pageSize });
	const [completedTodos, setCompletedTodos] = useState<Record<number, boolean>>({});

	const toggleCompletion = (id: number) => {
		setCompletedTodos((prev) => ({
			...prev,
			[id]: !prev[id]
		}));
	};

	if (isLoading) return <Spinner />;
	if (error instanceof Error) return <Text color="red.500">Error: {error.message}</Text>;

	// Safely handle meta
	const totalPages = todos?.meta?.totalPages || 1;

	return (
		<>
			<Heading as="h1" color={'whiteAlpha.700'}>
				Todos
			</Heading>
			<TodoForm />
			<List.Root as="ol" mt={2}>
				{Array.isArray(todos?.data) &&
					todos.data.map((todo: Todo, index) => (
						<ListItem key={index} display="flex" justifyContent="space-between">
							<Text textDecoration={completedTodos[todo.id] ? 'line-through' : 'none'} color={completedTodos[todo.id] ? 'green.600' : 'white'}>
								⚆ {todo.title}
							</Text>
							<Checkbox variant={'solid'} marginLeft={4} onChange={() => toggleCompletion(todo.id)}></Checkbox>
						</ListItem>
					))}
			</List.Root>
			{/* Pagination */}
			<HStack mt={4}>
				<Button disabled={page === 1} bgColor="blue.400" color="white" onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
					Previous
				</Button>
				<Text color="white">
					Page {page} of {totalPages}
				</Text>
				<Button disabled={page === totalPages} bgColor="orange.400" color="white" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>
					Next
				</Button>
			</HStack>
		</>
	);
};

export default Todos;
