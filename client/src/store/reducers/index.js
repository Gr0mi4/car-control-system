import { combineReducers } from '@reduxjs/toolkit';

import { user } from './user';
import { vehicle } from './vehicle';
import { vehicleList } from './vehicleList';

export const reducer = combineReducers({
  user,
  vehicle,
  vehicleList,
});