import './style.scss';

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
                  canDeleteField={ index > 4 }
                  deleteCustomField={ () => props.deleteCustomField(fieldName) }
                />
              </div>);
          }
          return null;
        }) }
        <CustomFieldInput updateVehicleInfo={ props.updateVehicleInfo }/>
      </div>
    </div>
  );
};