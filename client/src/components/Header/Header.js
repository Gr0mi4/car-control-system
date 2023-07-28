import './Header.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setUser, deleteUSerFromLocalStore } from '../../store/actions/user';

import LogoutIcon from './../../assets/icons/logout.png';
import BackIcon from './../../assets/icons/back.png';

export const Header = ({ previousScreen }) => {
  const user = useSelector(state => state.user.username);

  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    dispatch(setUser({ username: null, id: null }));
    dispatch(deleteUSerFromLocalStore());
    window.location.href = 'http://localhost:3000/auth';
  }

  function handleHigherPage() {
    history.push(previousScreen);
  }


  return (
    <div className="header">
      <p className="username">Username: <span className="login">{ user }</span></p>
      <div className="button-block">
        { previousScreen &&
          <button className="back button" onClick={ handleHigherPage }>
            <img className="back-icon" src={ BackIcon } alt="back-icon"/>
          </button>
        }
        <button className="exit button" onClick={ handleLogout }>
          <img className="logout-icon" src={ LogoutIcon } alt="logout-icon"/>
          Logout
        </button>
      </div>
    </div>
  );
};
