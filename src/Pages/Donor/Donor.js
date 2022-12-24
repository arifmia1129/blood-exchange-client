import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';

const Donor = ({ donor }) => {
    const { name, division, district, upazila, contact, bloodGroup, imageUrl } = donor;

    const [divisionName, setDivisionName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [upazilaName, setUpazilaName] = useState('');


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
                    <p>Division:{division}</p>
                    <p>District:{district}</p>
                    <p>Upazila:{upazila}</p>
                </div>
                <button class="btn btn-primary">Select For Contact</button>
            </div>
        </div>
    );
};

export default Donor;