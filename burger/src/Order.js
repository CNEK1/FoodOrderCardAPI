import React, { useEffect, useState } from 'react';
import { Button, Table, Tr, Th, Tbody, Td, Thead, Container } from '@chakra-ui/react';
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
                    {typeof backData.items === 'undefined' ? (
                        <p>Loading...</p>
                    ) : (
                        backData.items.map((burger, e) => (
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
            <Container>{}</Container>
            <Link to="/">
                <Button variant="solid">Back</Button>
            </Link>
        </div>
    );
}

export default Order;
