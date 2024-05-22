import './style.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login, register } from 'store/dispatchers/user';
import { checkAuth } from 'store/actions/user';
import { USER_NOT_EXIST } from 'store/constants/user';

import { useHttp } from 'hooks/http.hook';
import { loginValidation, passwordValidation } from './utils/validation';

import { InputForm } from './components/InputForm/InputForm';
import { CreateUserForm } from './components/CreateUserForm/createUserForm';

export const AuthPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const userId = useSelector(state => state.user.id);

  const { error, setError } = useHttp();

  const userAuthenticated = !!userId;


  useEffect(() => {
    dispatch(checkAuth());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    if (!loginValidation(username) && !passwordValidation(password)) {
      dispatch(login({ username, password }));
    } else {
      loginValidation(username) ? setError(loginValidation(username)) : setError(passwordValidation(password));
    }
  };

  const createUser = async () => {
    // If we want to create user in this flow (it's stupid) user already tried to login
    const { username, password } = user;
    dispatch(register({ username, password, id: Math.random() }));
  };

  return (
    <div>
      <div className="main-title-block">
        <h1 className="main-title">Welcome to VCS Vehicle Control System!</h1>
        <h3 className="secondary-title">Here you can manage all your vehicles in one place</h3>
      </div>
      <section className="action-block">
        <InputForm handleSendForm={ handleLogin }/>
        { (userAuthenticated) &&
          <Redirect to="/mainScreen/"/>
        }
        { user.authStatus === USER_NOT_EXIST &&
          <CreateUserForm createUser={ createUser }/>
        }
        { error && <div className="error validation">{ error }</div> }
      </section>
    </div>
  );
};

export default AuthPage;