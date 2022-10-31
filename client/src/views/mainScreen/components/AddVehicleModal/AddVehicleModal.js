import { ModalWindow } from '../../../../components/ModalWindow/ModalWindow';
import { useState } from 'react';
import { VehiclePhoto } from '../../../../components/VehiclePhoto/VehiclePhoto';

export const AddVehicleModal = ({show, onClose, onSave}) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [modification, setModification] = useState('');
  const [type, setType] = useState('car');

  const brandChangeHandler = event => {
    setBrand(event.target.value);
  }

  const modelChangeHandler = event => {
    setModel(event.target.value);
  }

  const modificationChangeHandler = event => {
    setModification(event.target.value);
  }

  const handleChangeVehicleType = (event) => {
    setType(event.target.value);
  }

  const modalHeader = <h1>Add new vehicle</h1>;
  const modalBody =
    <div>
      <input placeholder="Type" type="text" onChange={handleChangeVehicleType} value={type}/>
      <input placeholder="Brand" type="text" onChange={brandChangeHandler} value={brand}/>
      <input placeholder="Model" type="text" onChange={modelChangeHandler} value={model}/>
      <input placeholder="Modification" type="text" onChange={modificationChangeHandler} value={modification}/>
      <VehiclePhoto/>
    </div>
  const modalFooter =
    <button
      onClick={() => onSave(brand, model, modification, type)}
      className="button"
    >
      Save
    </button>

  return (
    <ModalWindow
      header={modalHeader}
      body={modalBody}
      footer={modalFooter}
      show={show}
      onClose={onClose}
    />
  )

}