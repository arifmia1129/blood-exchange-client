import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteDonorMutation } from '../../features/api/apiSlice';
import Loading from '../Shared/Loading';

const SingleDonor = ({ donor }) => {
    const { name, division, district, upazila, bloodGroup, contact, imageUrl, _id } = donor;

    const navigate = useNavigate()

    const [deleteDonor, { isSuccess, isLoading, isError }] = useDeleteDonorMutation();

    const dispatch = useDispatch();

    const [divisionName, setDivisionName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [upazilaName, setUpazilaName] = useState('');


    useEffect(() => {

        fetch('division.json')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setDivisionName(data.find(d => d.id === division).name)
            })
        fetch('district.json')
            .then(res => res.json())
            .then(data => {
                setDistrictName(data.find(d => d.id === district).name)
            })
        fetch('upazila.json')
            .then(res => res.json())
            .then(data => {
                setUpazilaName(data.find(d => d.id === upazila).name)
            })
    }, [division, district, upazila])

    if (isLoading) {
        return <Loading />
    }
    return (
        <tr>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={imageUrl} alt="donor" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{name}</div>
                        <div class="text-sm opacity-50">{divisionName}, {districtName}, {upazilaName}</div>
                    </div>
                </div>
            </td>
            <td className='text-red-500 font-bold'>
                {bloodGroup.toUpperCase()}
            </td>
            <td>{contact}</td>
            <th>
                <button onClick={() => navigate(`/dashboard/edit-donor/${_id}`)} class="btn btn-ghost btn-xs">
                    <AiFillEdit size={20} />
                </button>
                <button onClick={() => dispatch(deleteDonor(_id))} class="btn btn-ghost btn-xs">
                    <AiFillDelete size={20} />
                </button>
            </th>
        </tr>
    );
};

export default SingleDonor;