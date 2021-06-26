import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import vehicleListSlice from "./reducers/vehicleListSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    vehicleList: vehicleListSlice
  }
})
