import { request } from '../api';
import { setUser, saveUserInLocalStorage } from '../actions/user';
import { USER_NOT_EXIST, WRONG_PASSWORD } from '../constants/user';

export const login = ({ username, password }) => async (dispatch) => {
  try {
    const user = await request('/api/auth/check', 'POST', { username, password });
    dispatch(setUser({ username, id: user.id }));
    dispatch(saveUserInLocalStorage(user));
  } catch (err) {
    const user = { username, password };
    if (err.statusCode === 401) {
      user.authStatus = USER_NOT_EXIST;
    } else if (err.statusCode === 403) {
      user.authStatus = WRONG_PASSWORD;
    }
    dispatch(setUser(user));
  }
};

export const register = ({ username, password }) => async (dispatch) => {
  const newUser = await request('/api/auth/register', 'POST', { username, password, id: Math.random() });
  dispatch(setUser(newUser));
};