import { DELETE_VEHICLE, SAVE_NEW_VEHICLE, SET_VEHICLE_LIST } from '../constants/vehicleList';

export const setVehicleList = (vehicleData) => ({
  type: SET_VEHICLE_LIST,
  vehicleData
});

export const deleteVehicle = (id) => ({
  type: DELETE_VEHICLE,
  id,
});

export const addNewVehicle = (vehicleDetails) => ({
  type: SAVE_NEW_VEHICLE,
  vehicleDetails,
});