import React, { useEffect, useState } from 'react';
import { Box, Center, Table, Thead, Tbody, Tr, Th, Td, Container } from '@chakra-ui/react';

function App() {
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
    // useEffect(() => {
    //     fetch('/costOfEvery')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setAnotherBackData(data);
    //         });
    // }, []);

    return (
        <div>
            <Center fontSize="5xl">Orders</Center>
            <Container maxW="container.l">Cost of All Orders: {anotherBackData.sumOf}$</Container>
            <Container maxW="container.l">{JSON.stringify(anotherBackData.items)}</Container>
            <Box w="100%" p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
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
                            <p>Loading...</p>
                        ) : (
                            backData.burgers.map((burger, e) => (
                                <Tr key={e}>
                                    <Td>{burger._title}</Td>
                                    <Td>{burger._order}</Td>
                                    <Td>{burger._cost}$</Td>
                                    <Td>{burger._amount}</Td>
                                    <Td>{JSON.stringify(burger._like)}</Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </Box>
        </div>
    );
}

export default App;
