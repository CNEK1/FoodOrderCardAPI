import React, { useState } from 'react';
import { Input, Button, Stack, Center, Text, Container, Select } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function PostItem() {
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState();
    const [amount, setAmount] = useState();
    const [order, setOrder] = useState();
    const [like, setLike] = useState();
    const [postBackData, setPostBackData] = useState([{}]);

    const handleSumbit = (e) => {
        e.preventDefault();
        const newItem = { title, cost, amount, order, like };
        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem) })
            .then((res) => res.json())
            .then((data) => {
                console.log('prikol');
                setPostBackData(data);
            });
    };

    return (
        <div>
            <Container maxW="container.sm">
                <Stack spacing={'20px'}>
                    <Center fontSize={'3xl'}>Emulation of new order</Center>
                    <Text fontSize={'xl'}>JSON view</Text>
                    <Text>
                        {'{'}
                        <Text margin={'3'}>"title":{title}</Text>
                        <Text margin={'3'}>"cost": {cost}</Text>
                        <Text margin={'3'}>"amount":{amount}</Text>
                        <Text margin={'3'}>"order":{order}</Text>
                        <Text margin={'3'}>"like":{like}</Text>
                        {'}'}
                    </Text>
                    <form onSubmit={handleSumbit}>
                        <Input type={'text'} value={title} required placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                        <Input type={'number'} value={cost} required placeholder="cost" onChange={(e) => setCost(e.target.value)} />
                        <Input type={'number'} value={amount} required placeholder="amount" onChange={(e) => setAmount(e.target.value)} />
                        <Input type={'number'} value={order} required placeholder="order" onChange={(e) => setOrder(e.target.value)} />
                        <Select type={'text'} value={like} required onChange={(e) => setLike(e.target.value)}>
                            <option>true</option>
                            <option>false</option>
                        </Select>
                        <Center>
                            <Button type="submit">Send</Button>
                        </Center>
                    </form>
                    <Link as={Link} to="/getAllfromDB">
                        <Button variant="solid">Back</Button>
                    </Link>
                </Stack>
            </Container>
        </div>
    );
}

export default PostItem;
