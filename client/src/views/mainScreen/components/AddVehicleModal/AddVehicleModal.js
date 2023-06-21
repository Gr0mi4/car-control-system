import './style.scss';

import { ModalWindow } from '../../../../components/ModalWindow/ModalWindow';
import { useState } from 'react';
import { VehiclePhoto } from '../../../../components/VehiclePhoto/VehiclePhoto';

export const AddVehicleModal = ({ show, onClose, onSave }) => {

  const [ brand, setBrand ] = useState('');
  const [ model, setModel ] = useState('');
  const [ modification, setModification ] = useState('');
  const [ type, setType ] = useState('car');
  const [ imageSrc, setImageSrc ] = useState('');

  const brandChangeHandler = event => {
    setBrand(event.target.value);
  };

  const modelChangeHandler = event => {
    setModel(event.target.value);
  };

  const modificationChangeHandler = event => {
    setModification(event.target.value);
  };

  const handleChangeVehicleType = (event) => {
    setType(event.target.value);
  };

  const getVehicleSrc = (fieldName, url) => {
    setImageSrc(url);
  };

  const modalHeader = <h1>Add Vehicle</h1>;
  const modalBody =
    <div className="add-vehicle-modal-body">
      <label className="label">Type</label>
      <input className="input" type="text" onChange={ handleChangeVehicleType } value={ type }/>
      <label className="label">Brand</label>
      <input className="input" type="text" onChange={ brandChangeHandler } value={ brand }/>
      <label className="label">Model</label>
      <input className="input" type="text" onChange={ modelChangeHandler } value={ model }/>
      <label className="label">Modification</label>
      <input className="input half-size" type="text" onChange={ modificationChangeHandler } value={ modification }/>
      <VehiclePhoto className="compact-size" vehicleCreationMode={ true } updateVehicleImage={ getVehicleSrc }/>
    </div>;
  const modalFooter = <button onClick={ () => onSave(brand, model, modification, type, imageSrc) }
                              className="save button">
    Save
  </button>;

  return (
    <ModalWindow
      header={ modalHeader }
      body={ modalBody }
      footer={ modalFooter }
      show={ show }
      onClose={ onClose }
    />
  );
};