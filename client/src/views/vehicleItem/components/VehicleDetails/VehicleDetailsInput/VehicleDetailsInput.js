import './style.scss';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateVehicleInfo, deleteVehicleCustomProp } from 'store/dispatchers/vehicle';

import OkIcon from 'icons/ok-circled-black.svg';
import Delete from 'icons/delete.svg';

export const VehicleDetailsInput = ({ value, fieldName, defaultFields }) => {
  const [ editable, setEditable ] = useState(false);
  const [ innerValue, setInnerValue ] = useState(value);

  const dispatch = useDispatch();

  function handleInputChange(event) {
    setInnerValue(event.target.value);
  }

  function handleSubmit() {
    setEditable(false);
    dispatch(updateVehicleInfo(fieldName, innerValue));
  }

  function handleBlur(evt) {
    if (evt.relatedTarget) {
      if (evt.relatedTarget.id === 'submit-field') {
        handleSubmit();
      }
      if (evt.relatedTarget.id === 'delete-field') {
        dispatch(deleteVehicleCustomProp(fieldName));
      }
    }
    setEditable(false);
  }

  return (
    <div>
      { editable
        ? (
          <form className="vehicle-info-input-wrapper" onSubmit={ handleSubmit }>
            <input className="vehicle-info-input"
                   onChange={ handleInputChange }
                   onBlur={ handleBlur }
                   value={ innerValue }
                   autoFocus
            />
            <button className="submit-button" id="submit-field">
              <img className="ok-icon" src={ OkIcon } alt="ok-icon"/>
            </button>
            { !defaultFields.includes(fieldName) &&
              <button
                onClick={ () => dispatch(deleteVehicleCustomProp(fieldName)) }
                className="delete-field icon-button" id="delete-field"
              >
                <img className="delete-icon" src={ Delete } alt="delete"/>
              </button> }
          </form>)
        : (
          <div className="field-value" onClick={ () => setEditable(true) }>
            { value || ' No Value Provided ' }
          </div>) }
    </div>
  );

};