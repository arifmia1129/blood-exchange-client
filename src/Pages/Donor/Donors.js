import React from 'react';
import { useGetDonorQuery } from '../../features/api/apiSlice';
import Error from '../Shared/Error';
import Loading from '../Shared/Loading';
import Donor from './Donor';

const Donors = () => {
    const { data, error, isLoading } = useGetDonorQuery();

    const donors = data?.donors;


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error?.error} />
    }
    return (
        <div>
            <h3 className='font-bold text-primary text-3xl'>Our available Hero Donor</h3>

            <div className='grid grid-cols-2 gap-10'>
                {
                    donors?.map(donor => <Donor key={donor._id} donor={donor} />)
                }
            </div>
        </div>
    );
};

export default Donors;