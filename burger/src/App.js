import React from 'react';
import ListOfOrders from './ListOfOrders';
import ListFromMongo from './ListFromMongo';
import Order from './Order';
import { Routes, Route } from 'react-router-dom';
import PostItem from './PostItem';

function App() {
    return (
        <Routes>
            <Route path="/" element={<ListOfOrders />} />
            <Route path="/:id/order" element={<Order />} />
            <Route path="/getAllfromDB" element={<ListFromMongo />} />
            <Route path="/postItem" element={<PostItem />} />
        </Routes>
    );
}

export default App;
