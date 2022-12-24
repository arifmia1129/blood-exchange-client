import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllDonor from '../Pages/Dashboard/AllDonor';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Donors from '../Pages/Donor/Donors';
import Navbar from '../Pages/Shared/Navbar';

const Index = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Donors />} />
                <Route path='/dashboard' element={<Dashboard />} >
                    <Route index element={<AllDonor />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Index;