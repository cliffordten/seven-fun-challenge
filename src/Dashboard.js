import { AddIcon, Search2Icon } from '@chakra-ui/icons';
import { Box, Button, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');

    if (isAuth !== 'true') {
      navigate('/login');
    }

    return () => {};
  }, []);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <Box w={'600px'} margin="auto">
      <Stack direction={'row'} justifyContent="center" mt={'100px'}>
        <Box
          w={'300px'}
          borderRadius="10"
          h={'200px'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          style={{
            display: 'flex',
            placeItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          p={6}
          onClick={() => navigate('/addResult')}
          mr="10"
        >
          <AddIcon w={6} h={6} mr="5" />
          Add Student Results
        </Box>

        <Box
          w={'300px'}
          borderRadius="10"
          h={'200px'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          style={{
            display: 'flex',
            placeItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/searchResult')}
          p={6}
        >
          <Search2Icon w={6} h={6} mr="5" />
          Search Student Results
        </Box>
      </Stack>
      <Button width={'100%'} marginTop="10" colorScheme="blue" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
