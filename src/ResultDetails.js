import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Grid,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
  Heading,
  Text,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useNavigate, useParams } from 'react-router-dom';

const ResultDetails = () => {
  const navigate = useNavigate();
  const { index } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');

    if (isAuth !== 'true') {
      navigate('/login');
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (index) {
      const studentResults = JSON.parse(
        localStorage.getItem('studentResults') || '[]'
      );

      setUser(studentResults[index]);
    }

    return () => {};
  }, [index]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Heading> Semester Report </Heading>

          <TableContainer>
            <Table /* variant='striped' */ colorScheme="teal" width={'900px'}>
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td>{user?.name}</Td>
                </Tr>
                <Tr>
                  <Td>Academic Year</Td>
                  <Td>{user?.date}</Td>
                </Tr>
                <Tr>
                  <Td>Semester</Td>
                  <Td>{user?.semester}</Td>
                </Tr>
                <Tr>
                  <Td>GPA</Td>
                  <Td>{user?.gpa}</Td>
                </Tr>

                {user?.courses?.length ? (
                  <Tr>
                    <Td colSpan={2} overflow="hidden">
                      <Box
                        display={'flex'}
                        justifyContent="center"
                        width={'100%'}
                      >
                        <Box>
                          <Text
                            textAlign={'center'}
                            width="100%"
                            fontSize={'lg'}
                            mb="5"
                            textDecoration={'underline'}
                            fontWeight="bold"
                          >
                            Student Courses
                          </Text>

                          {user?.courses?.map(({ title, grade }, ind) => (
                            <Box
                              display={'flex'}
                              justifyContent="space-between"
                              mt={'2'}
                              key={ind}
                            >
                              <Text
                                width={'300px'}
                                textAlign={'center'}
                                fontSize={'md'}
                              >
                                <span style={{ fontWeight: 'bold' }}>
                                  Subject:
                                </span>{' '}
                                {title}
                              </Text>
                              <Text
                                width={'300px'}
                                textAlign={'center'}
                                fontSize={'md'}
                              >
                                <span style={{ fontWeight: 'bold' }}>
                                  Grade:
                                </span>{' '}
                                {grade}
                              </Text>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Td>
                  </Tr>
                ) : null}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Grid>
    </Box>
  );
};

export default ResultDetails;
