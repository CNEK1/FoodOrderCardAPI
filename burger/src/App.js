import React from 'react';
import ListOfOrders from './ListOfOrders';
import Order from './Order';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<ListOfOrders />} />
            <Route path="/:id/order" element={<Order />} />
        </Routes>
    );
}

export default App;
