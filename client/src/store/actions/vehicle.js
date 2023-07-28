import {
  SET_VEHICLE,
  UPDATE_VEHICLE_PROP,
  DELETE_VEHICLE_PROP,
  ADD_VEHICLE_PROP,
  SET_VEHICLE_ADDITIONAL_IMAGES,
  ADD_VEHICLE_ADDITIONAL_IMAGE,
  DELETE_VEHICLE_ADDITIONAL_IMAGE,
  SET_NOTES, ADD_NOTE, EDIT_NOTE, DELETE_NOTE
} from '../constants/vehicle';

// Vehicle Info

export const setVehicle = (vehicleData) => ({
  type: SET_VEHICLE,
  vehicleData
});

export const updateVehicleProp = (propData) => ({
  type: UPDATE_VEHICLE_PROP,
  propData
});

export const deleteVehicleProp = (fieldName) => ({
  type: DELETE_VEHICLE_PROP,
  fieldName
});

export const addVehicleProp = (propData) => ({
  type: ADD_VEHICLE_PROP,
  propData
});

// Images

export const setVehicleAdditionalImages = (images) => ({
  type: SET_VEHICLE_ADDITIONAL_IMAGES,
  images
});

export const addVehicleAdditionalImage = (image) => ({
  type: ADD_VEHICLE_ADDITIONAL_IMAGE,
  image
});

export const deleteVehicleAdditionalImage = (imageId) => ({
  type: DELETE_VEHICLE_ADDITIONAL_IMAGE,
  imageId
});

// Notes

export const setVehicleNotes = (notes) => ({
  type: SET_NOTES,
  notes
});

export const addVehicleNote = (note) => ({
  type: ADD_NOTE,
  note
});

export const editVehicleNote = (note) => ({
  type: EDIT_NOTE,
  note
});

export const deleteVehicleNote = (noteId) => ({
  type: DELETE_NOTE,
  noteId
});