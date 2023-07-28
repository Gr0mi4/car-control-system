import { request } from '../api';
import { deleteVehicle, setVehicleList } from '../actions/vehicleList';

export const getUserVehicles = (id = null) => async (dispatch, getState) => {
  const userId = id;
  const vehicleList = await request('/api/vehicle/getUserVehicles', 'POST', { userId });
  dispatch(setVehicleList(vehicleList));
};

export const deleteCurrentVehicle = (id) => async (dispatch) => {
  await request('/api/vehicle/deleteVehicle', 'POST', { id });
  dispatch(deleteVehicle(id));
};

export const addNewVehicle = ({ brand, model, modification, type, image }) => async (dispatch, getState) => {
  const userId = getState().user.id;
  await request('/api/vehicle/saveNewVehicle', 'POST', { userId, brand, model, modification, type, image });
};