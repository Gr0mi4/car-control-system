import { request } from '../api';
import {
  setVehicle,
  updateVehicleProp,
  deleteVehicleProp,
  setVehicleAdditionalImages,
  addVehicleAdditionalImage,
  deleteVehicleAdditionalImage,
  setVehicleNotes,
  deleteVehicleNote,
} from '../actions/vehicle';

export const getVehicleInfo = (id) => async (dispatch) => {
  const vehicleInfo = await request('/api/vehicle/getVehicleInfo', 'POST', { vehicleId: id });
  dispatch(setVehicle(vehicleInfo));
};

export const updateVehicleInfo = (fieldName, value) => async (dispatch, getState) => {
  const id = getState().vehicle.info._id;
  await request('/api/vehicle/changeVehicleProp', 'POST', {
    vehicleId: id, newValue: value, updatedField: fieldName,
  }).then(() => {
    dispatch(updateVehicleProp({ fieldName, value }));
  });
};

export const deleteVehicleCustomProp = (fieldName) => async (dispatch, getState) => {
  const id = getState().vehicle.info._id;
  const vehicleInfo = await request('/api/vehicle/deleteCustomField', 'POST', { vehicleId: id, fieldName });
  if (vehicleInfo) {
    dispatch(deleteVehicleProp(fieldName));
  }
};

// Images

export const getVehicleImages = (id) => async (dispatch) => {
  const vehicleImages = await request('/api/images/getAdditionalImages', 'POST', { vehicleId: id });
  if (vehicleImages) {
    dispatch(setVehicleAdditionalImages(vehicleImages));
  }
};

export const uploadVehicleAdditionalImage = (src, name) => async (dispatch, getState) => {
  const id = getState().vehicle.info._id;
  const imageUploaded = await request('/api/images/uploadAdditionalImage', 'POST', {
    vehicleId: id, src, name
  });
  dispatch(addVehicleAdditionalImage(imageUploaded));
};

export const removeVehicleAdditionalImage = (imageId) => async (dispatch) => {
  const deletedImage = await request('/api/images/deleteAdditionalImages', 'POST', { imageId });
  if (deletedImage) {
    dispatch(deleteVehicleAdditionalImage(imageId));
  }
};

// Notes

export const getVehicleNotes = (id) => async (dispatch) => {
  const vehicleNotes = await request('/api/notes/getVehicleNotes', 'POST', { vehicleId: id });
  dispatch(setVehicleNotes(vehicleNotes));
};

export const addNote = ({ text, name }) => async (dispatch, getState) => {
  const id = getState().vehicle.info._id;
  const updatedNotes = await request('/api/notes/addNote', 'POST', { vehicleId: id, text, name });
  dispatch(setVehicleNotes(updatedNotes));
};

export const editNote = ({ text, name, id }) => async (dispatch) => {
  const updatedNotes = await request('/api/notes/changeNote', 'POST', { id, text, name });
  dispatch(setVehicleNotes(updatedNotes));
};

export const deleteNote = (noteId) => async (dispatch) => {
  await request('/api/notes/deleteNote', 'POST', { id: noteId })
    .then(() => {
      dispatch(deleteVehicleNote(noteId));
    });
};