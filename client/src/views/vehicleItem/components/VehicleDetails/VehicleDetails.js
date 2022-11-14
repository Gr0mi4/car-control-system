import './style.scss';

import Delete from '../../../../assets/icons/delete.svg';
import { VehicleDetailsInput } from './VehicleDetailsInput/VehicleDetailsInput';
import { CustomFieldInput } from './CustomFieldInput/CustomFieldInput';

export const VehicleDetails = (props) => {
  // Utility fields that shouldn't be shown
  const hiddenInfoFields = [ 'userId', 'image', '__v', '_id' ];

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
        <CustomFieldInput updateVehicleInfo={ props.updateVehicleInfo }/>
      </div>
    </div>
  );
};