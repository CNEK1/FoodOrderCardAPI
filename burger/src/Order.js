import React, { useEffect, useState } from 'react';
import { Button, Table, Tr, Th, Tbody, Td, Thead, Stack, Text, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Order() {
    const [backData, setBackData] = useState([{}]);
    const { id } = useParams();
    useEffect(() => {
        fetch(`/${id}/order`)
            .then((res) => res.json())
            .then((data) => {
                setBackData(data);
            });
    }, []);

    return (
        <div>
            <Stack spacing={'10px'}>
                <Center fontSize="3xl">Order {id}</Center>
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Cost</Th>
                            <Th>Amount</Th>
                            <Th>Like</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {typeof backData.items === 'undefined' ? (
                            <Button variant="ghost" isLoading loadingText="Loading" colorScheme="black" spinnerPlacement="end"></Button>
                        ) : (
                            backData.items.map((burger, e) => (
                                <Tr key={e}>
                                    <Td>{burger._title}</Td>
                                    <Td>{burger._cost}$</Td>
                                    <Td>{burger._amount}</Td>
                                    <Td>{JSON.stringify(burger._like)}</Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
                <Link to="/">
                    <Button variant="solid">Back</Button>
                </Link>
            </Stack>
        </div>
    );
}

export default Order;
