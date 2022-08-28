import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  FormControl,
  FormLabel,
  Select,
  Input,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Button,
  Flex,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

function App() {
  const [subject, setSubject] = useState({ title: null, grade: null });
  const [subjectList, setSubjectList] = useState([]);

  useEffect(()=> {

    
  }, [subject.grade, subject.title ])

  const handleClick = () => {
    setSubject({ title: null, grade: null })
    setSubjectList(prev => ([...prev, subject]));
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Heading>First Semester Report </Heading>
            

            <TableContainer>
              <Table /* variant='striped' */ colorScheme="teal" width={'900px'}>
                <TableCaption>Student Progress Report</TableCaption>
                <Tbody>
                <Tr>
                    <Td>Name</Td>
                    <Td>
                      <Input placeholder="Enter Full Name" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Academic Year</Td>
                    <Td>
                    <Input
     placeholder="Select Date and Time"
     size="md"
     type="date"
    />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Score</Td>
                    <Td>
                      <Input placeholder="" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Coef.</Td>
                    <Td>
                      <Input  />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Total</Td>
                    <Td>
                      <Input  />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Subject</Td>
                    <Td>
                  <Flex justifyContent={"space-around"}>
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
                      <Button width={"150px"} onClick={handleClick} >add subject</Button>
                  </Flex>
                    </Td>
                  </Tr>
                  {subjectList.length ?
                    subjectList.map(({ title, grade }) => (
                      <Tr>
                        <Td>Subject: {title}</Td>
                        <Td>Grade: {grade}</Td>
                      </Tr>
                    )): null}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
