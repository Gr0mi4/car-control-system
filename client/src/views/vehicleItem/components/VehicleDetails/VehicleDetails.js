import './style.scss';

import OkIcon from '../../../../assets/icons/ok-circled-black.svg';
import Delete from '../../../../assets/icons/delete.svg';
import { useState } from 'react';
import { VehicleDetailsInput } from './VehicleDetailsInput/VehicleDetailsInput';

export const VehicleDetails = (props) => {
  // Utility fields that shouldn't be shown
  const hiddenInfoFields = [ 'userId', 'image', '__v', '_id' ];

  const [ customFieldName, setCustomFieldName ] = useState('');
  const [ customFieldValue, setCustomFieldValue ] = useState('');
  const [ customFieldInputVisible, setCustomFieldInputVisible ] = useState(false);

  function addCustomField() {
    props.updateVehicleInfo(customFieldName, customFieldValue)
      .then(() => {
        setCustomFieldName('');
        setCustomFieldValue('');
        setCustomFieldInputVisible(false);
      });
  }

  return (
    <div className="details-wrapper">
      <h1 className="details-header">Vehicle details</h1>
      <div className="details">
        { Object.keys(props.vehicleInfo).map((fieldName, index) => {
          // Check if this field should be shown or not
          if (!hiddenInfoFields.includes(fieldName)) {
            return (
              <div key={ fieldName } className="details-field">
                <div className="field-name">{ fieldName } :</div>
                <VehicleDetailsInput
                  value={ props.vehicleInfo[fieldName] }
                  updateValue={ (value) => props.updateVehicleInfo(fieldName, value) }
                />
                { index > 4 &&
                  <button
                    onClick={ (event) => props.deleteCustomField(event, fieldName) }
                    className="delete-field button"
                  >
                    <img className="delete-icon" src={ Delete } alt="delete"/>
                  </button>
                }
              </div>);
          }
          return null;
        }) }
        { customFieldInputVisible &&
          <div className="custom-field-wrapper">
            <input className="vehicle-info-input" onChange={ (evt) => setCustomFieldName(evt.target.value) }/>
            :
            <input className="vehicle-info-input" onChange={ (evt) => setCustomFieldValue(evt.target.value) }/>
            <button className="submit-button" onClick={ addCustomField }>
              <img className="ok-icon" src={ OkIcon } alt="ok"/>
            </button>
          </div>
        }
        <button className="button" onClick={ () => {
          setCustomFieldInputVisible(!customFieldInputVisible);
        } }>{ customFieldInputVisible ? 'Do not add custom field' : 'Add custom field' }
        </button>
      </div>
    </div>
  );
};