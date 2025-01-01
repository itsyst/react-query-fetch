import { useState } from 'react';
import { Button, Heading, HStack, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/types/TodoType';
import useTodos from '@/hooks/useTodos';

const Todos = () => {
	const pageSize = 10;
	const [page, setPage] = useState(1);
	const { data: todos, error: error, isLoading } = useTodos({ page, pageSize });
	const [completedTodos, setCompletedTodos] = useState<Record<number, boolean>>({});

	const toggleCompletion = (id: number) => {
		setCompletedTodos((prev) => ({
			...prev,
			[id]: !prev[id]
		}));
	};

	if (isLoading) return <Spinner />;
	if (error instanceof Error) return <Text color="red.500">Error: {error.message}</Text>;

	return (
		<>
			<Heading as="h1" color={'whiteAlpha.700'}>
				Todos
			</Heading>
			<List.Root as="ol" mt={4}>
				{Array.isArray(todos) &&
					todos.slice(0, pageSize).map((todo: Todo) => (
						<ListItem key={todo.id} display="flex" justifyContent="space-between">
							<Text textDecoration={completedTodos[todo.id] ? 'line-through' : 'none'} color={completedTodos[todo.id] ? 'green.600' : 'white'}>
								{todo.id}: {todo.title}
							</Text>
							<Checkbox variant={'solid'} marginLeft={4} onChange={() => toggleCompletion(todo.id)}></Checkbox>
						</ListItem>
					))}

				{/* Pagination */}
				<HStack mt={4} position={'absolute'} bottom={4} left={4}>
					<Button disabled={page === 1} bgColor="blue.400" color="white" onClick={() => setPage((prev) => prev - 1)}>
						Previous
					</Button>
					<Button
						disabled={!Array.isArray(todos) || page === todos.length}
						bgColor="orange.400"
						color="white"
						onClick={() => setPage((prev) => prev + 1)}
					>
						Next
					</Button>
				</HStack>
			</List.Root>
		</>
	);
};

export default Todos;
