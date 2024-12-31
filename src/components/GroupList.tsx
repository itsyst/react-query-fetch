import { useEffect, useState } from 'react';
import { Button, HStack, List, ListItem } from '@chakra-ui/react';
import { MdOutlineUnfoldLess } from 'react-icons/md';
import { Todo } from '@/types/TodoType';
import axios from 'axios';

const GroupList = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [error, setError] = useState(null);
	const [visibleCount, setVisibleCount] = useState(10);

	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/todos')
			.then((res) => setTodos(res.data))
			.catch((error) => setError(error));
	}, []);

	const handleShowMore = () => {
		setVisibleCount((prev) => Math.min(30, prev + 10)); // Show 10 more todos each time
	};

	const handleShowLes = () => {
		setVisibleCount((prev) => Math.max(10, prev - 10));
	};

	if (error) return <p>{error}</p>;

	return (
		<List.Root as="ol">
			{todos.slice(0, visibleCount).map((todo: Todo) => (
				<ListItem key={todo.id}>{todo.title}</ListItem>
			))}
			{visibleCount < todos.length && (
				<HStack mt={2}>
					<Button bgColor={'blue.400'} onClick={handleShowMore}>
						Show More
					</Button>
					<Button bg={'orange.400'} onClick={handleShowLes}>
						<MdOutlineUnfoldLess color="white" />
					</Button>
				</HStack>
			)}
		</List.Root>
	);
};

export default GroupList;
