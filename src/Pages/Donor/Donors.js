import React from 'react';
import { useGetDonorQuery } from '../../features/api/apiSlice';
import Loading from '../Shared/Loading';

const Donors = () => {
    const { data, error, isLoading } = useGetDonorQuery();

    const donors = data?.donors;

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
        </div>
    );
};

export default Donors;