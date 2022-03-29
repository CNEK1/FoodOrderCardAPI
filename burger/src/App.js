import React from 'react';
import ListOfOrders from './ListOfOrders';
import ListFromMongo from './ListFromMongo';
import Order from './Order';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<ListOfOrders />} />
            <Route path="/:id/order" element={<Order />} />
            <Route path="/getAllfromDB" element={<ListFromMongo/>}/>
        </Routes>
    );
}

export default App;
