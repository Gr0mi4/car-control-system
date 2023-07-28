import './style.scss';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getUserVehicles } from '../../store/dispatchers/vehicleList';

import { VehicleList } from './components/VehicleList/VehicleList';
import { AddVehicleModal } from './components/AddVehicleModal/AddVehicleModal';

import PlusIcon from '../../assets/icons/plus.png';

export const MainScreen = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.id);

  const [ newVehicleModalVisible, setNewVehicleModalVisible ] = useState(false);

  useEffect(() => {
    dispatch(getUserVehicles(userId));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  function showNewVehicleClick() {
    setNewVehicleModalVisible(true);
  }

  function handleCloseAddNewVehicleModal() {
    setNewVehicleModalVisible(false);
  }

  return (
    <div className="main-screen">
      { !userId && <Redirect to="/auth"/> }
      <section className="main-section">
        <h1 className="title">Chose vehicle you want to work with</h1>
        <VehicleList/>
      </section>
      <section className="footer-section">
        <button id="Add" className="add-vehicle button" onClick={ showNewVehicleClick }>
          <img src={ PlusIcon } className="plus icon" alt="plus"/>
        </button>
        <label htmlFor="Add" className="add-label">Add New Vehicle</label>
      </section>
      <AddVehicleModal
        show={ newVehicleModalVisible }
        onClose={ handleCloseAddNewVehicleModal }
        onSave={ () => dispatch(getUserVehicles(userId)) }
      />
    </div>
  );
};

export default MainScreen;
