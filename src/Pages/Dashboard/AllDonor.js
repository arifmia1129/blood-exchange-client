import React from 'react';
import { useGetDonorQuery } from '../../features/api/apiSlice';
import Loading from '../Shared/Loading';
import SingleDonor from './SingleDonor';


const AllDonor = () => {
    const { data, error, isLoading } = useGetDonorQuery(null);



    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className='text-primary font-bold text-xl'>All Donor List</h1>

            <div>
                <div class="overflow-x-auto w-full">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>Details</th>
                                <th>Blood Group</th>
                                <th>Contact</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.donors?.map(donor => <SingleDonor key={donor?._id} donor={donor} />)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllDonor;