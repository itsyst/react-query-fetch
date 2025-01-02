import useComments from '@/hooks/useComments';
import { Button, Heading, HStack, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

const Comments = () => {
	const pageSize = 3;
	const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useComments({ pageSize });

	// const comments =
	// 	data?.pages.reduce((acc, page) => {
	// 		return [...acc, ...page];
	// 	}, []) || [];
	// const comments = data?.pages.flatMap((page) => page) || [];

	if (isLoading) return <Spinner />;
	if (error instanceof Error) return <Text color="red.500">Error: {error.message}</Text>;

	return (
		<>
			<Heading as="h1" color={'whiteAlpha.700'}>
				Comments
			</Heading>
			<List.Root as="ul" mt={4} display={'flex'} listStyle={'none'} flexDirection={'column'}>
				{data?.pages.map((page, index) => (
					<ListItem key={index} mt={2} p={2} borderRadius={2}>
						{page.map((comment) => (
							<React.Fragment key={comment.id}>
								<Text color={'white'} fontWeight={'bolder'} textDecoration={'underline'}>
									{comment.name}
								</Text>
								<Text color={'white'}>{comment.body}</Text>
							</React.Fragment>
						))}
					</ListItem>
				))}
			</List.Root>
			{/* Pagination */}
			<HStack mt={4}>
				{hasNextPage && (
					<Button bgColor="blue.400" color="white" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
						{isFetchingNextPage ? <Spinner size="sm" /> : 'Load More'}
					</Button>
				)}
			</HStack>
		</>
	);
};

export default Comments;
