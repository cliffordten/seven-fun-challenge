import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Input,
  Select,
  Button,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8} width="500px" margin="auto">
          <Input placeholder='Enter your user name' />
          <Input
     placeholder="Select The Year"
     size="md"
     type="number" MaxLength= "4"
    />
          <Select placeholder='Select Semester'>
  <option value='Semester1'>Semester1</option>
  <option value='Semester2'>Semester2</option>
</Select>
          <Button colorScheme='blue'>Search</Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
