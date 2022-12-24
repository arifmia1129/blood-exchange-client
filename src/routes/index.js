import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddDonor from '../Pages/Dashboard/AddDonor';
import AllDonor from '../Pages/Dashboard/AllDonor';
import Dashboard from '../Pages/Dashboard/Dashboard';
import EditDonor from '../Pages/Dashboard/EditDonor';
import Donors from '../Pages/Donor/Donors';
import SelectedDonors from '../Pages/SelectedDonors/SelectedDonors';
import Navbar from '../Pages/Shared/Navbar';

const Index = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Donors />} />
                <Route path='/contacts' element={<SelectedDonors />} />
                <Route path='/dashboard' element={<Dashboard />} >
                    <Route index element={<AllDonor />} />
                    <Route path='add-donor' element={<AddDonor />} />
                    <Route path='edit-donor/:id' element={<EditDonor />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Index;