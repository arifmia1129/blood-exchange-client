import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    donors: []
}

export const donorSlice = createSlice({
    name: 'donor',
    initialState,
    reducers: {
        addDonor: (state, action) => {
            const exist = state.donors.find(donor => donor._id === action.payload._id)
            if (!exist) {
                state.donors.push(action.payload)
            }
        },
        removeDonor: (state, action) => {
            const filteredDonors = state.donors.filter(donor => donor._id !== action.payload._id);
            state.donors = filteredDonors;
        }
    }
})

export const { addDonor, removeDonor } = donorSlice.actions;

export default donorSlice.reducer;