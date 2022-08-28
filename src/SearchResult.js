import {
  Box,
  VStack,
  Input,
  Select,
  Button,
  Grid,
  Heading,
  Alert,
  AlertIcon,
  TableContainer,
  Table,
  Text,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SearchResult = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    name: null,
    date: null,
    semester: null,
  });

  const [results, setResults] = useState(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');

    if (isAuth !== 'true') {
      navigate('/login');
    }

    return () => {};
  }, []);

  const search = () => {
    const studentResults = JSON.parse(
      localStorage.getItem('studentResults') || '[]'
    )?.map((item, inx) => ({ ...item, id: inx }));

    if (!studentResults?.length) {
      setError('No records found');
      return;
    }

    const searchResult = studentResults.filter(({ name, date, semester }) => {
      return (
        name?.toLowerCase()?.includes(studentInfo.name?.toLowerCase()) ||
        studentInfo.date === date ||
        studentInfo.semester?.toLowerCase() === semester?.toLowerCase()
      );
    });

    if (!searchResult?.length) {
      setError('No records found');
      return;
    }

    setResults(searchResult);
  };

  const goToDetails = ind => {
    navigate('/resultDetails/' + ind);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8} width="500px" margin="auto">
          <Heading as="h2" size="xl">
            Search a Student Result
          </Heading>
          {error ? (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          ) : null}
          <Input
            placeholder="Enter your name"
            value={studentInfo.name}
            onChange={e =>
              setStudentInfo(prev => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Select The Year"
            size="md"
            type="date"
            onChange={e =>
              setStudentInfo(prev => ({
                ...prev,
                date: new Date(e.target.value).getFullYear(),
              }))
            }
          />
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
          <Button colorScheme="blue" width={'100%'} onClick={search}>
            Search
          </Button>
        </VStack>
        {results?.length ? (
          <Box display={'flex'} justifyContent="center" mt={'10'}>
            <TableContainer>
              <Text fontWeight={'bold'}>Search Results</Text>
              <Table colorScheme="teal" width={'900px'}>
                <Tbody>
                  <Tr>
                    <Td>Name</Td>
                    <Td>Semester</Td>
                    <Td>Year</Td>
                    <Td></Td>
                  </Tr>
                  {results?.map(({ name, date, semester, id }, inx) => (
                    <Tr key={inx}>
                      <Td>{name}</Td>
                      <Td>{semester}</Td>
                      <Td>{date}</Td>
                      <Td>
                        {' '}
                        <Button
                          width={'100%'}
                          marginTop="10"
                          colorScheme="blue"
                          onClick={() => goToDetails(id)}
                        >
                          View Detail
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ) : null}
      </Grid>
    </Box>
  );
};

export default SearchResult;
