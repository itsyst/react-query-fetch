import { useState } from 'react';
import { Box, Flex, Heading, HStack, Link, List, ListItem, MenuContent, MenuItem, MenuRoot, MenuTrigger, Spinner, Text } from '@chakra-ui/react';
import { VscFoldDown, VscFoldUp } from 'react-icons/vsc';
import { MdOutlineUnfoldLess } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { User } from '@/types/UserType';
import usePosts from '@/hooks/usePosts';
import useUsers from '@/hooks/useUsers';

const Posts = () => {
	const [user, setUser] = useState<User>();
	const { data: posts, error, isLoading } = usePosts(user);
	const { data: users } = useUsers();
	const [visiblePosts, setVisiblePosts] = useState(10);
	const [visibleContent, setVisibleContent] = useState<Record<number, boolean>>({});

	const handleShowMore = () => setVisiblePosts((prev) => Math.min(25, prev + 10));
	const handleShowLes = () => setVisiblePosts((prev) => Math.max(10, prev - 10));
	const handleVisibleContent = (id: number) => setVisibleContent((prev) => ({ ...prev, [id]: !prev[id] }));

	if (isLoading) return <Spinner />;
	if (error instanceof Error) return <Text color="red.500">Error: {error.message}</Text>;

	return (
		<>
			<Heading as="h1" color={'whiteAlpha.700'}>
				Posts
			</Heading>

			{/* Select Dropdown */}
			<MenuRoot>
				<MenuTrigger asChild bg="gray.700" color="white" _hover={{ bg: 'gray.600' }} mt={2}>
					<Button
						variant="outline"
						size="sm"
						position={'relative'}
						left={0}
						borderColor={'white'}
						_hover={{ bg: '#3C3D37', color: 'white', borderColor: 'white' }}
					>
						{user?.name || 'Select author'}
					</Button>
				</MenuTrigger>
				<MenuContent bg="white" boxShadow="md" borderRadius="md" position={'absolute'}>
					{users?.map((user) => (
						<MenuItem key={user.name} value={user.name} onClick={() => setUser(user)} _hover={{ bg: '#3C3D37', color: 'white' }}>
							{user.name}
						</MenuItem>
					))}
				</MenuContent>
			</MenuRoot>

			{/* Posts List */}
			<List.Root as={'ol'} mt={2}>
				{posts?.slice(0, visiblePosts).map((post) => (
					<Box key={post.id}>
						<HStack display={'flex'} justifyContent={'space-between'}>
							<ListItem color={'white'}>{post.title}</ListItem>
							<Link onClick={() => handleVisibleContent(post.id)}>
								{visibleContent[post.id] ? <VscFoldUp color="white" /> : <VscFoldDown color="white" />}
							</Link>
						</HStack>
						{visibleContent[post.id] && (
							<Flex bg={'beige'} p={2} m={2} borderRadius="md" boxShadow="md">
								<Text>{post.body}</Text>
							</Flex>
						)}
					</Box>
				))}

				{/* Buttons */}
				<HStack mt={4}>
					{!user && (
						<Button bg={'blue.400'} color={'white'} onClick={handleShowMore}>
							Show More
						</Button>
					)}
					{visiblePosts > 10 && posts && posts.length > 10 && (
						<Button bgColor={'orange.400'} color="white" onClick={handleShowLes}>
							<MdOutlineUnfoldLess />
						</Button>
					)}
				</HStack>
			</List.Root>
		</>
	);
};

export default Posts;
