import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDonor, removeDonor } from '../../features/donor/donorSlice';
import Loading from '../Shared/Loading';

const Donor = ({ donor }) => {
    const { name, division, district, upazila, contact, bloodGroup, imageUrl, _id } = donor || {};

    const [divisionName, setDivisionName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [upazilaName, setUpazilaName] = useState('');

    const donors = useSelector(state => state.donor.donors);
    const dispatch = useDispatch();

    const exist = donors.find(donor => donor._id === _id);

    useEffect(() => {
        fetch('division.json')
            .then(res => res.json())
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

    return (
        <div class="hero bg-base-200 my-5 rounded-lg">
            <div class="hero-content flex-col lg:flex-row">
                <img height={200} width={130} src={imageUrl} alt='' />
                <div>
                    <h1 class="text-xl font-bold">{name}</h1>
                    <p>{contact}</p>
                    <p className='font-bold text-red-500'>{bloodGroup.toUpperCase()}</p>
                    <p>Division:{divisionName}</p>
                    <p>District:{districtName}</p>
                    <p>Upazila:{upazilaName}</p>
                </div>
                {
                    !exist ?
                        <button onClick={() => dispatch(addDonor(donor))} class="btn btn-primary">Select For Contact</button>
                        :
                        <button onClick={() => dispatch(removeDonor(donor))} class="btn bg-red-500 text-white border-0">Remove From Selected Contact</button>
                }
            </div>
        </div>
    );
};

export default Donor;