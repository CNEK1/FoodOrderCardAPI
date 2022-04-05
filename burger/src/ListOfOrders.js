import React, { useEffect, useState } from 'react';
import { Box, Center, Table, Thead, Tbody, Tr, Th, Td, Container, Button, Text, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ListOfOrders() {
    const [backData, setBackData] = useState([{}]);
    const [anotherBackData, setAnotherBackData] = useState([{}]);
    useEffect(() => {
        fetch('/get')
            .then((res) => res.json())
            .then((data) => {
                setBackData(data);
            });
        fetch('/costOfEvery')
            .then((res) => res.json())
            .then((data) => {
                setAnotherBackData(data);
            });
    }, []);
    return (
        <div>
            <Stack spacing="15px">
                <Center fontSize="5xl">Orders</Center>
                <Link as={Link} to="/getAllfromDB">
                    <Button variant="link">Data from MongoDB</Button>
                </Link>
                <Container maxW="container.l">
                    <Text>Info:</Text>
                    <Box w="30%" p={4} borderWidth="2px" borderRadius="lg" overflow="hidden" alignItems="baseline" display="flex">
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th>Order</Th>
                                    <Th>Cost</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {typeof anotherBackData.items === 'undefined' ? (
                                    <Button variant="ghost" isLoading colorScheme="black" spinnerPlacement="end"></Button>
                                ) : (
                                    Object.entries(anotherBackData.items).map(([id, values]) => (
                                        <Tr>
                                            <Td>
                                                {
                                                    <Link as={Link} to={`/${id}/order`}>
                                                        <Button variant="link">{id}</Button>
                                                    </Link>
                                                }
                                            </Td>
                                            <Td>{values}$</Td>
                                        </Tr>
                                    ))
                                )}
                                <Text> Cost of All Orders: {anotherBackData.sumOf}$</Text>
                            </Tbody>
                        </Table>
                    </Box>
                </Container>
                <Container maxW="container.l">
                    <Text>Every position in Orders:</Text>
                    <Box w="100%" p={4} borderWidth="2px" borderRadius="lg" overflow="hidden" display="flex" alignItems="baseline">
                        <Table size="md">
                            <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Order</Th>
                                    <Th>Cost</Th>
                                    <Th>Amount</Th>
                                    <Th>Like</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {typeof backData.burgers === 'undefined' ? (
                                    <Button variant="ghost" isLoading colorScheme="black" spinnerPlacement="end"></Button>
                                ) : (
                                    backData.burgers.map((burger, e) => (
                                        <Tr key={e}>
                                            <Td>{burger._title}</Td>
                                            <Td>{burger._order}</Td>
                                            <Td>{burger._cost}$ </Td>
                                            <Td>{burger._amount}</Td>
                                            <Td>{JSON.stringify(burger._like)}</Td>
                                        </Tr>
                                    ))
                                )}
                            </Tbody>
                        </Table>
                    </Box>
                </Container>
            </Stack>
        </div>
    );
}

export default ListOfOrders;
