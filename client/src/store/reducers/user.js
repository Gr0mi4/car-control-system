import { CHECK_AUTH, DELETE_USER_FROM_LOCAL_STORE, SAVE_USER_IN_LOCAL_STORAGE, SET_USER } from '../constants/user';

const storageName = 'userData';

export const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    case CHECK_AUTH: {
      const data = JSON.parse(localStorage.getItem('userData'));
      if (data && data.token) {
        return { username: data.username, id: data.id };
      } else {
        return state;
      }
    }

    case SAVE_USER_IN_LOCAL_STORAGE: {
      const { id, token, username } = action.user;
      localStorage.setItem(storageName, JSON.stringify({ id, token, username }));
      return state;
    }

    case DELETE_USER_FROM_LOCAL_STORE: {
      localStorage.removeItem(storageName);
      return state;
    }

    default: {
      return state;
    }
  }
};