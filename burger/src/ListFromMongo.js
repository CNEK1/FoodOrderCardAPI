import React, { useEffect, useState } from 'react';
import { Button, Table, Tr, Th, Tbody, Td, Thead, Stack, Center, Box, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ListFromMongo() {
    const [backData, setBackData] = useState([{}]);
    useEffect(() => {
        fetch("/getAllfromDB")
            .then((res) => res.json())
            .then((data) => {
                setBackData(data);
            });
    }, []);

    return (
        <div>
            <Stack spacing={'10px'}>
                <Center fontSize="3xl">Data From MongoDB</Center>
                <Container maxW="container.sm">
                    <Box p={4} borderWidth="2px" borderRadius="lg" overflow="hidden" display="flex" alignItems="baseline">
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Cost</Th>
                                    <Th>Amount</Th>
                                    <Th>Like</Th>
                                    <Th>Order</Th>
                                    <Th>Created At</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {typeof backData.items === 'undefined' ? (
                                    <Button variant="ghost" isLoading colorScheme="black" spinnerPlacement="end"></Button>
                                ) : (
                                    backData.items.map((item, e) => (
                                        <Tr key={e}>
                                            <Td>{item.title}</Td>
                                            <Td>{item.cost}$</Td>
                                            <Td>{item.amount}</Td>
                                            <Td>{JSON.stringify(item.like)}</Td>
                                            <Td>{item.order}</Td>
                                            <Td>{item.createdAt}</Td>
                                        </Tr>
                                    ))
                                )}
                            </Tbody>
                        </Table>
                    </Box>
                </Container>
                <Link as={Link} to="/">
                    <Button variant="solid">Back</Button>
                </Link>
            </Stack>
        </div>
    );
}

export default ListFromMongo;
