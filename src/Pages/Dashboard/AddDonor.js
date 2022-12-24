import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddDonorMutation } from '../../features/api/apiSlice';
import Loading from '../Shared/Loading';

const AddDonor = () => {
    const [addDonor, { isLoading }] = useAddDonorMutation();

    const dispatch = useDispatch();

    const [division, setDivision] = useState([]);
    const [district, setDistrict] = useState([]);
    const [upazila, setUpazila] = useState([]);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [divisionName, setDivisionName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [upazilaName, setUpazilaName] = useState('');

    const handleAddDonor = () => {
        const donor = {
            name,
            division: divisionName,
            district: districtName,
            upazila: upazilaName,
            bloodGroup,
            contact,
            imageUrl
        }

        dispatch(addDonor(donor))
    }


    useEffect(() => {
        if (!divisionName && !districtName && !upazilaName) {
            fetch('../division.json')
                .then(res => res.json())
                .then(data => {
                    setDivision(data)
                })
        }
        if (!districtName && !upazilaName) {
            fetch('../district.json')
                .then(res => res.json())
                .then(data => {
                    setDistrict(data.filter(d => d.division_id === divisionName));
                })
        }
        if (!upazilaName) {
            fetch('../upazila.json')
                .then(res => res.json())
                .then(data => {
                    setUpazila(data.filter(u => u.district_id === districtName));
                })
        }


    }, [divisionName, districtName, upazilaName])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className='md:grid grid-cols-2'>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Donor Name</span>
                    </label>
                    <input onChange={e => setName(e.target.value)} type="text" placeholder="Enter donar full name" class="input input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Donor Contact Number</span>
                    </label>
                    <input onChange={e => setContact(e.target.value)} maxLength={11} type="text" placeholder="Enter donar contact number" class="input input-bordered w-full max-w-xs" />
                </div>
            </div>
            <div className='md:grid grid-cols-2'>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Donor Image URL</span>
                    </label>
                    <input onChange={e => setImageUrl(e.target.value)} type="text" placeholder="Enter donar image url" class="input input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Donor Blood Group</span>
                    </label>
                    <select onChange={e => setBloodGroup(e.target.value)} class="select select-bordered">
                        <option disabled selected value=''>Blood Group</option>
                        <option value='a+'>A+</option>
                        <option value='a-'>A-</option>
                        <option value='b+'>B+</option>
                        <option value='b-'>B-</option>
                        <option value='ab+'>AB+</option>
                        <option value='ab-'>AB-</option>
                        <option value='o+'>O+</option>
                        <option value='o-'>O-</option>
                    </select>
                </div>
            </div>
            <div className='md:grid grid-cols-2'>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Division</span>
                    </label>
                    <select onChange={e => setDivisionName(e.target.value)} class="select select-bordered">
                        <option disabled selected value=''>Division</option>
                        {
                            division?.map(divisionName => <option key={divisionName.id} value={divisionName.id}>{divisionName.name}</option>)
                        }
                    </select>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">District</span>
                    </label>
                    <select onChange={e => setDistrictName(e.target.value)} class="select select-bordered">
                        <option disabled selected value=''>District</option>
                        {
                            district?.map(districtName => <option key={districtName.id} value={districtName.id}>{districtName.name}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className='md:grid grid-cols-2 place-content-center'>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Division</span>
                    </label>
                    <select onChange={e => setUpazilaName(e.target.value)} class="select select-bordered">
                        <option disabled selected value=''>Upazila</option>
                        {
                            upazila?.map(upazilaName => <option key={upazilaName.id} value={upazilaName.id}>{upazilaName.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <button onClick={handleAddDonor} className='btn btn-primary text-white mt-8'>Add Donor</button>
                </div>
            </div>
        </div>
    );
};

export default AddDonor;