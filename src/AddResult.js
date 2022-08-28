import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Grid,
  Input,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
  Heading,
  Button,
  Flex,
  Text,
  Alert,
  AlertIcon,
  Select,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';

const AddResult = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');

    if (isAuth !== 'true') {
      navigate('/login');
    }

    return () => {};
  }, []);

  const [subject, setSubject] = useState({ title: null, grade: null });
  const [subjectList, setSubjectList] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    name: null,
    date: null,
    gpa: null,
    semester: null,
    courses: subjectList,
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {}, [subject.grade, subject.title]);

  const handleClick = () => {
    setSubjectList(prev => [...prev, subject]);
  };

  const addResults = () => {
    const studentResults = JSON.parse(
      localStorage.getItem('studentResults') || '[]'
    );

    const result = {
      ...studentInfo,
      courses: subjectList,
    };

    localStorage.setItem(
      'studentResults',
      JSON.stringify([...studentResults, result])
    );

    console.log(
      '%cAddResult.js line:68 [...studentResults, result]',
      'color: #007acc;',
      [...studentResults, result]
    );

    setSubject({ title: null, grade: null });
    setSubjectList([]);
    setStudentInfo({
      name: null,
      date: null,
      gpa: null,
      semester: null,
      courses: [],
    });
    setSuccess(true);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Heading> Semester Report </Heading>

          <TableContainer>
            {success ? (
              <Alert status="success">
                <AlertIcon />
                {'Successfully saved student results'}
              </Alert>
            ) : null}
            <Table /* variant='striped' */ colorScheme="teal" width={'900px'}>
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td>
                    <Input
                      placeholder="Enter Full Name"
                      value={studentInfo.name}
                      onChange={e =>
                        setStudentInfo(prev => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Academic Year</Td>
                  <Td>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      value={studentInfo.date}
                      onChange={e =>
                        setStudentInfo(prev => ({
                          ...prev,
                          date: new Date(e.target.value).getFullYear(),
                        }))
                      }
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Semester</Td>
                  <Td>
                    <Select
                      placeholder="Select Semester"
                      value={studentInfo.semester}
                      onChange={e =>
                        setStudentInfo(prev => ({
                          ...prev,
                          semester: e.target.value,
                        }))
                      }
                    >
                      <option value="Semester1">Semester 1</option>
                      <option value="Semester2">Semester 2</option>
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>GPA</Td>
                  <Td>
                    <Input
                      placeholder="GPA"
                      value={studentInfo.gpa}
                      onChange={e =>
                        setStudentInfo(prev => ({
                          ...prev,
                          gpa: e.target.value,
                        }))
                      }
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Courses</Td>
                  <Td>
                    <Flex justifyContent={'space-around'}>
                      <Input
                        placeholder="Course Name"
                        value={subject.title}
                        onChange={e =>
                          setSubject(prev => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        width="30%"
                      />
                      <Input
                        placeholder="Grade"
                        value={subject.grade}
                        onChange={e =>
                          setSubject(prev => ({
                            ...prev,
                            grade: e.target.value,
                          }))
                        }
                        width="30%"
                      />
                      <Button width={'150px'} onClick={handleClick}>
                        add subject
                      </Button>
                    </Flex>
                  </Td>
                </Tr>

                {subjectList.length ? (
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

                          {subjectList.map(({ title, grade }, ind) => (
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
            <Button
              width={'100%'}
              marginTop="10"
              colorScheme="blue"
              onClick={addResults}
              disabled={!subjectList.length}
            >
              Add Result
            </Button>
          </TableContainer>
        </VStack>
      </Grid>
    </Box>
  );
};

export default AddResult;
