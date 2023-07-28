import {
  SET_VEHICLE,
  UPDATE_VEHICLE_PROP,
  DELETE_VEHICLE_PROP,
  ADD_VEHICLE_PROP,
  SET_VEHICLE_ADDITIONAL_IMAGES,
  ADD_VEHICLE_ADDITIONAL_IMAGE,
  DELETE_VEHICLE_ADDITIONAL_IMAGE,
  SET_NOTES,
  DELETE_NOTE,
} from '../constants/vehicle';

const initialState = {
  images: [],
  notes: [],
  info: {}
};

export const vehicle = (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLE: {
      let results = action.vehicleData;
      // Parsing for additional props
      if (results.additionalFields && Object.values(results.additionalFields).length > 0) {
        const additionalFields = results.additionalFields;
        results = { ...results, ...additionalFields };
      }

      const values = Object.values(results);
      const keys = Object.keys(results);
      const parsedResults = {};

      keys.map((key, index) => {
        if (key === 'additionalFields') {
          return null;
        }
        return parsedResults[key] = values[index];
      });
      return {
        ...state,
        info: parsedResults
      };
    }

    case UPDATE_VEHICLE_PROP: {
      const { fieldName, value } = action.propData;
      return { ...state, info: { ...state.info, [fieldName]: value } };
    }

    case DELETE_VEHICLE_PROP: {
      const fieldName = action.fieldName;
      const newInfo = { ...state.info };
      delete newInfo[fieldName];
      return { ...state, info: newInfo };
    }

    case ADD_VEHICLE_PROP: {
      const { fieldName, value } = action.propData;
      return { ...state, info: { ...state.info, [fieldName]: value } };
    }

    case SET_VEHICLE_ADDITIONAL_IMAGES: {
      return { ...state, images: [ ...action.images ] };
    }

    case ADD_VEHICLE_ADDITIONAL_IMAGE: {
      return { ...state, images: [ ...state.images, action.image ] };
    }

    case DELETE_VEHICLE_ADDITIONAL_IMAGE: {
      const updatedImagesArray = [ ...state.images ];
      const imageIndex = updatedImagesArray.findIndex(item => item._id === action.imageId);
      updatedImagesArray.splice(imageIndex, 1);
      return { ...state, images: [ ...updatedImagesArray ] };
    }

    case SET_NOTES: {
      return { ...state, notes: [ ...action.notes ] };
    }

    case DELETE_NOTE: {
      const notesArray = [ ...state.notes ];
      const deletedNoteIndex = notesArray.findIndex(item => {
        return item._id === action.noteId;
      });
      if (deletedNoteIndex >= 0) {
        notesArray.splice(deletedNoteIndex, 1);
      }
      return { ...state, notes: [ ...notesArray ] };
    }

    default: {
      return state;
    }
  }
};