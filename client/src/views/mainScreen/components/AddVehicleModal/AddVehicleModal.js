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
  const [ pendingRequest, setPendingRequest ] = useState(false);
  const [ showValidationError, setShowValidationError ] = useState(false);

  function vehicleDataValid(brand, model, type) {
    if (brand && model && type) {
      setShowValidationError(false);
      return true;
    } else {
      setShowValidationError(true);
      return false;
    }
  }

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

  const deleteAllData = () => {
    setBrand('');
    setModel('');
    setModification('');
    setType('car');
    setImageSrc('');
  };

  const saveNewVehicle = () => {
    if (!pendingRequest && vehicleDataValid(brand, model, type)) {
      setPendingRequest(true);
      dispatch(addNewVehicle({ brand, model, modification, type, image: imageSrc }))
        .then(() => {
          onSave();
          onClose();
          deleteAllData();
          setPendingRequest(false);
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
        setPendingRequest={ setPendingRequest }
        setImageSrc={ setImageSrc }
      />
    </div>;
  const modalFooter =
    <div>
      { showValidationError && <div className="error">Please specify Type, Brand and Model</div> }
      <button
        onClick={ saveNewVehicle }
        className={ pendingRequest ? "save button disabled" : "save button" }
      >
        Save
      </button>
    </div>;

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