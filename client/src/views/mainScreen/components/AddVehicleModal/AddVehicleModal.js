import './style.scss';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addNewVehicle } from 'store/dispatchers/vehicleList';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { VehicleImagePreview } from './VehicleImagePreview/VehicleImagePreview';

export const AddVehicleModal = ({ show, onClose, onSave }) => {
  const dispatch = useDispatch();

  const [ brand, setBrand ] = useState('');
  const [ model, setModel ] = useState('');
  const [ modification, setModification ] = useState('');
  const [ type, setType ] = useState('car');
  const [ imageSrc, setImageSrc ] = useState('');
  const [ saveDisabled, setSaveDisabled ] = useState(false);

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

  const deleteAllData = () => {
    setBrand('');
    setModel('');
    setModification('');
    setType('car');
    setImageSrc('');
  };

  const saveNewVehicle = () => {
    if (!saveDisabled) {
      setSaveDisabled(true);
      dispatch(addNewVehicle({ brand, model, modification, type, image: imageSrc }))
        .then(() => {
          onSave();
          onClose();
          deleteAllData();
          setSaveDisabled(false);
        });
    }
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
      <VehicleImagePreview
        setSaveDisabled={ setSaveDisabled }
        setImageSrc={ setImageSrc }
      />
    </div>;
  const modalFooter =
    <button
      onClick={ saveNewVehicle }
      className={ saveDisabled ? "save button disabled" : "save button" }
    >
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