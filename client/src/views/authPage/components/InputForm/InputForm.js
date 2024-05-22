import './style.scss';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { WRONG_PASSWORD } from 'store/constants/user';

export const InputForm = ({ handleSendForm }) => {
  const user = useSelector(state => state.user);

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const invalidPasswordError = 'Password is incorrect';

  return (
    <form className="input-form">
      <div className="input-wrapper">
        <label className="login label">Login</label>
        <input
          className="user-name-input"
          placeholder="Type your login"
          type="text"
          onChange={ handleUsernameChange }
        />
      </div>
      <div className="input-wrapper">
        <label className="password label">Password</label>
        <input
          className="user-name-input"
          placeholder="********"
          type="password"
          onChange={ handlePasswordChange }
        />
        { user.authStatus === WRONG_PASSWORD && <p className="error password">{ invalidPasswordError }</p> }
      </div>
      <button
        className="proceed-button"
        onClick={ (event) => {
          handleSendForm(event, username, password);
        } }
      >Proceed
      </button>
    </form>
  );
};

export default InputForm;

