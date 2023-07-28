import './style.scss';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import { checkAuth } from '../store/actions/user';

import AuthPage from './authPage/authPage';
import MainScreen from './mainScreen/mainScreen';

import { VehicleItem } from './vehicleItem/VehicleItem';
import { Header } from '../components/Header/Header';

export const MainLayout = () => {
  const dispatch = useDispatch();

  function redirect() {
    if (window.location.href === 'http://localhost:3000/') {
      window.location.href = 'http://localhost:3000/auth';
    }
  }

  useEffect(() => {
    dispatch(checkAuth());
    redirect();
  }, []);


  return (
    <div className="main">
      <Route path="/auth">
        <AuthPage/>
      </Route>
      <Route path="/mainScreen">
        <Header/>
        <MainScreen/>
      </Route>
      <Route path="/vehicle/:id">
        <Header previousScreen="/mainScreen"/>
        <VehicleItem/>
      </Route>
    </div>
  );
};

export default MainLayout;
