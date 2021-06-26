import {createSlice} from "@reduxjs/toolkit";

export const vehicleListSlice = createSlice({
    name: 'vehicleList',
    initialState: {
        value: []
    },
    reducers: {
        setVehicleList: (state, action) => {
            console.log(action.payload, 'reducer')
            state.value = action.payload

        }
    }
})

export const {setVehicleList} = vehicleListSlice.actions

export default vehicleListSlice.reducer