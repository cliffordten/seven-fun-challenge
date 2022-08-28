import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Grid,
  Input,
  Button,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginDetails, setLoginDetails] = useState({
    username: null,
    password: null,
  });
  const loginInfo = {
    username: 'douala@university.com',
    password: 'doualauniversiy',
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');

    if (isAuth === 'true') {
      navigate('/dashboard');
    }

    setError(null);
    return () => {};
  }, [loginDetails.password, loginDetails.username]);

  const login = () => {
    if (
      loginDetails.username !== loginInfo.username &&
      loginDetails.password !== loginInfo.password
    ) {
      setError('Incorrect username or password');
      return;
    }

    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack
          spacing={8}
          width="600px"
          margin={'auto'}
          border="1px solid grey"
          padding={10}
          borderRadius="10px"
          boxShadow={'md'}
          mt="28"
        >
          <Heading as="h2" size="xl">
            Login
          </Heading>
          {error ? (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          ) : null}
          <Input
            placeholder="User Name"
            value={loginDetails.username}
            onChange={e =>
              setLoginDetails(prev => ({ ...prev, username: e.target.value }))
            }
          />
          <Input
            placeholder="Password"
            type={'password'}
            value={loginDetails.password}
            onChange={e =>
              setLoginDetails(prev => ({ ...prev, password: e.target.value }))
            }
          />
          <Button width={'100%'} colorScheme="blue" onClick={login}>
            Sign In
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
}

export default App;
