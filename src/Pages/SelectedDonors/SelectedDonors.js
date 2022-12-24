import React from 'react';
import { useSelector } from 'react-redux';
import Donor from '../Donor/Donor';

const SelectedDonors = () => {
    const donors = useSelector(state => state.donor.donors);
    return (
        <div>
            <h3 className='font-bold text-primary text-3xl'>Selected Donors For Contact</h3>
            <div className='md:grid grid-cols-2 gap-10'>
                {
                    donors?.map(donor => <Donor key={donor?._id} donor={donor} />)
                }
            </div>
        </div>
    );
};

export default SelectedDonors;