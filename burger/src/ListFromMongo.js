import React, { useEffect, useState } from 'react';
import { Button, Table, Tr, Th, Tbody, Td, Thead, Stack, Center, Box, Container, Text } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function ListFromMongo() {
    const [backData, setBackData] = useState([{}]);
    const [ordersBackData, setOrdersBackData] = useState([{}]);
    const [deleteBackData, setDeleteBackData] = useState([{}]);

    useEffect(() => {
        getAll();
        getCostofEveryOrder();
    }, []);
    const getAll = () => {
        fetch('/getAllfromDB')
            .then((res) => res.json())
            .then((data) => {
                setBackData(data);
            });
    };
    const getCostofEveryOrder = () => {
        fetch('/getEveryCost')
            .then((res) => res.json())
            .then((data) => {
                setOrdersBackData(data);
            });
    };
    const deleteId = (id) => {
        fetch(`/${id}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then((data) => {
                setDeleteBackData(data);
                getAll();
            });
    };
    return (
        <div>
            <Stack spacing={'10px'}>
                <Center fontSize="3xl">Data From MongoDB</Center>
                <Center>
                    <Link as={Link} to="/postItem">
                        <Button variant="solid">Emulation of new order</Button>
                    </Link>
                </Center>
                <Center>Test {ordersBackData.objectOfMongo}</Center>
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
                                {typeof ordersBackData.items === 'undefined' ? (
                                    <Button variant="ghost" isLoading colorScheme="black" spinnerPlacement="end"></Button>
                                ) : (
                                    Object.entries(ordersBackData.items).map(([id, values]) => (
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
                                {/* //<Text> Cost of All Orders: {ordersBackData.sumOf}$</Text> */}
                            </Tbody>
                        </Table>
                    </Box>
                </Container>
                <Container maxW="container.sm">
                    <Text>Count of items: {backData.countOfItems}</Text>
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
                                            <Button
                                                onClick={() => {
                                                    deleteId(item._id);
                                                }}
                                                size={'sm'}
                                                variant="link"
                                            >
                                                <DeleteIcon></DeleteIcon>
                                            </Button>
                                            <Button size={'sm'} variant="link">
                                                <SettingsIcon />
                                            </Button>
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
