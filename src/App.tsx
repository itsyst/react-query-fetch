import Posts from './components/Posts';
import Todos from './components/Todos';
import './App.css';
import { Grid, GridItem } from '@chakra-ui/react';

function App() {
	return (
		<>
			<Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="6">
				<GridItem bg={'#8D0B41'} padding={4} rowSpan={2} colSpan={1} position={'relative'}>
					<Todos />
				</GridItem>
				<GridItem bg={'#3C3D37'} padding={4} rowSpan={2} colSpan={1}>
					<Posts />
				</GridItem>
			</Grid>
		</>
	);
}

export default App;
