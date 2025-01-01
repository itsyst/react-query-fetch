import { useState } from 'react';
import { Button, Heading, HStack, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import { MdOutlineUnfoldLess } from 'react-icons/md';
import useTodos from '@/hooks/useTodos';
const Todos = () => {
	const { data: todos, error: error, isLoading } = useTodos();
	const [visibleCount, setVisibleCount] = useState(10);
	const [completedTodos, setCompletedTodos] = useState<Record<number, boolean>>({});

	const handleShowMore = () => {
		if (todos) setVisibleCount((prev) => Math.min(25, prev + 10)); // Max 30 todos
	};

	const handleShowLess = () => setVisibleCount((prev) => Math.max(10, prev - 10)); // Min 10 todos

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
				{todos?.slice(0, visibleCount).map((todo) => (
					<ListItem key={todo.id} display="flex" justifyContent="space-between">
						<Text textDecoration={completedTodos[todo.id] ? 'line-through' : 'none'} color={completedTodos[todo.id] ? 'green.600' : 'white'}>
							{todo.id}: {todo.title}
						</Text>
						<Checkbox variant={'solid'} marginLeft={4} onChange={() => toggleCompletion(todo.id)}></Checkbox>
					</ListItem>
				))}
				<HStack mt={4}>
					{todos && visibleCount < todos?.length && (
						<Button bgColor="blue.400" color="white" onClick={handleShowMore}>
							Show More
						</Button>
					)}
					{visibleCount > 10 && (
						<Button bgColor="orange.400" color="white" onClick={handleShowLess}>
							<MdOutlineUnfoldLess />
						</Button>
					)}
				</HStack>
			</List.Root>
		</>
	);
};

export default Todos;
