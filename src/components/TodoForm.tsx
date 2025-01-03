import useAddTodo from '@/hooks/useAddTodo';
import {
	Button,
	Fieldset,
	HStack,
	Input,
	Spinner,
	Text
} from '@chakra-ui/react';
import { useRef } from 'react';

const TodoForm = () => {
	const {
		mutate: addTodo,
		isPending: isMutating,
		isError,
		error
	} = useAddTodo(() => {
		if (ref.current) ref.current.value = '';
	});
	const ref = useRef<HTMLInputElement>(null);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (ref.current && ref.current.value) {
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
