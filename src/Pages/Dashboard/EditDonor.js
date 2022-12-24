import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetSingleDonorQuery, useUpdateDonorMutation } from '../../features/api/apiSlice';
import Loading from '../Shared/Loading';

const EditDonor = () => {
    const { id } = useParams();

    const { data, isLoading } = useGetSingleDonorQuery(id);

    const [updateDonor, { isLoading: loading, isError, isSuccess }] = useUpdateDonorMutation();
    const { name: donorName, division: donorDivision, district: donorDistrict, upazila: donorUpazila, bloodGroup: donorBloodGroup, contact: donorContact, imageUrl: donorImage, _id } = data?.donor || {};


    const dispatch = useDispatch();

    const [division, setDivision] = useState([]);
    const [district, setDistrict] = useState([]);
    const [upazila, setUpazila] = useState([]);

    const [name, setName] = useState(donorName);
    const [contact, setContact] = useState(donorContact);
    const [imageUrl, setImageUrl] = useState(donorImage);
    const [bloodGroup, setBloodGroup] = useState(donorBloodGroup);
    const [divisionName, setDivisionName] = useState(donorDivision);
    const [districtName, setDistrictName] = useState(donorDistrict);
    const [upazilaName, setUpazilaName] = useState(donorUpazila);

    useEffect(() => {
        if (!divisionName && !districtName && !upazilaName) {
            fetch('../../division.json')
                .then(res => res.json())
                .then(data => {
                    setDivision(data)
                })
        }
        if (!districtName && !upazilaName) {
            fetch('../../district.json')
                .then(res => res.json())
                .then(data => {
                    setDistrict(data.filter(d => d.division_id === divisionName));
                })
        }
        if (!upazilaName) {
            fetch('../../upazila.json')
                .then(res => res.json())
                .then(data => {
                    setUpazila(data.filter(u => u.district_id === districtName));
                })
        }


    }, [divisionName, districtName, upazilaName])

    const handleUpdateDonor = () => {
        const donor = {
            name: name || donorName,
            division: divisionName || donorDivision,
            district: districtName || donorDistrict,
            upazila: upazilaName || donorUpazila,
            bloodGroup: bloodGroup || donorBloodGroup,
            contact: contact || donorContact,
            imageUrl: imageUrl || donorImage
        }

        const updateInfo = {
            id: _id,
            donor
        }

        dispatch(updateDonor(updateInfo))
    }




    if (isLoading || loading) {
        return <Loading />
    }

    return (
        <div>
            <div className='md:grid grid-cols-2'>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Donor Name</span>
                    </label>
                    <input defaultValue={donorName} onChange={e => setName(e.target.value)} type="text" placeholder="Enter donar full name" class="input input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Donor Contact Number</span>
                    </label>
                    <input defaultValue={donorContact} onChange={e => setContact(e.target.value)} maxLength={11} type="text" placeholder="Enter donar contact number" class="input input-bordered w-full max-w-xs" />
                </div>
            </div>
            <div className='md:grid grid-cols-2'>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Donor Image URL</span>
                    </label>
                    <input defaultValue={donorImage} onChange={e => setImageUrl(e.target.value)} type="text" placeholder="Enter donar image url" class="input input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Donor Blood Group</span>
                    </label>
                    <select defaultValue={donorBloodGroup} onChange={e => setBloodGroup(e.target.value)} class="select select-bordered">
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
                    <select defaultValue={donorDivision} onChange={e => setDivisionName(e.target.value)} class="select select-bordered">
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
                    <select defaultValue={donorDistrict} onChange={e => setDistrictName(e.target.value)} class="select select-bordered">
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
                    <select defaultValue={donorUpazila} onChange={e => setUpazilaName(e.target.value)} class="select select-bordered">
                        <option disabled selected value=''>Upazila</option>
                        {
                            upazila?.map(upazilaName => <option key={upazilaName.id} value={upazilaName.id}>{upazilaName.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <button onClick={handleUpdateDonor} className='btn btn-primary text-white mt-8'>Update Donor</button>
                </div>
            </div>
        </div>
    );
};

export default EditDonor;