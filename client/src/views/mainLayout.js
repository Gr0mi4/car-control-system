import { Route } from 'react-router-dom'
import AuthPage from './authPage/authPage';
import MainScreen from './mainScreen/mainScreen';

import { VehicleItem } from './vehicleItem/VehicleItem';
import { Header } from '../components/Header/Header';

import { useEffect } from 'react';

import './style.scss'

export const MainLayout = () => {
  function redirect() {
    if (window.location.href === 'http://localhost:3000/') {
      window.location.href = 'http://localhost:3000/auth';
    }
  }

  useEffect(() => {
    redirect()
  }, [])


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
        <Header/>
        <VehicleItem/>
      </Route>
    </div>
  )
}

export default MainLayout
