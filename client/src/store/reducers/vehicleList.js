import { DELETE_VEHICLE, SET_VEHICLE_LIST } from '../constants/vehicleList';

export const vehicleList = (state = [], action) => {
  switch (action.type) {
    case SET_VEHICLE_LIST: {
      let results = action.vehicleData;
      // Parsing for additional props
      if (results.additionalFields && Object.values(results.additionalFields).length > 0) {
        const additionalFields = results.additionalFields;
        results = { ...results, ...additionalFields };
      }

      const values = Object.values(results);
      const keys = Object.keys(results);
      const parsedResults = [];

      keys.map((key, index) => {
        if (key === 'additionalFields') {
          return null;
        }
        return parsedResults[key] = values[index];
      });
      return parsedResults;
    }

    case DELETE_VEHICLE: {
      const updatedList = [ ...state ];
      const vehicleIndex = updatedList.findIndex(item => item._id === action.id);
      return updatedList.splice(vehicleIndex, 1);
    }

    default: {
      return state;
    }
  }
};