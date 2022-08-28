import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Input,
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
        <Grid minH="100vh" >
          <ColorModeSwitcher justifySelf="flex-end" />
          <div className="login-container">
          <VStack spacing={8} textAlign="center">
          <Input placeholder='User Name'/>
          <Input placeholder='Password' />
          <Button colorScheme='blue'>SignIn</Button>
          </VStack>
          </div>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
