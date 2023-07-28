import {
  CHECK_AUTH,
  SET_USER,
  REGISTER_USER,
  SAVE_USER_IN_LOCAL_STORAGE,
  DELETE_USER_FROM_LOCAL_STORE
} from '../constants/user';

export const setUser = (user) => ({
  type: SET_USER,
  user
});

export const checkAuth = () => ({
  type: CHECK_AUTH,
});

export const saveUserInLocalStorage = (user) => ({
  type: SAVE_USER_IN_LOCAL_STORAGE,
  user
});

export const deleteUSerFromLocalStore = () => ({
  type: DELETE_USER_FROM_LOCAL_STORE
});

export const registerUser = (credentials) => ({
  type: REGISTER_USER,
  credentials,
});
