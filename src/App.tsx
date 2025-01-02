import Posts from './components/Posts';
import Todos from './components/Todos';
import './App.css';
import { Grid, GridItem } from '@chakra-ui/react';
import Comments from './components/Comments';

function App() {
	return (
		<Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="6" alignItems={'start'}>
			<GridItem bg={'#3C3D37'} padding={4} rowSpan={1} colSpan={{ base: 2, md: 1 }}>
				<Posts />
			</GridItem>
			<GridItem bg={'#8D0B41'} padding={4} rowSpan={1} colSpan={{ base: 2, md: 1 }}>
				<Todos />
			</GridItem>
			<GridItem bg={'#3A3960'} padding={4} rowSpan={1} colSpan={2}>
				<Comments />
			</GridItem>
		</Grid>
	);
}

export default App;
