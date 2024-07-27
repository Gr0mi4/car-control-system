import './style.scss';

import { useSelector } from 'react-redux';

import { VehicleDetailsInput } from './VehicleDetailsInput/VehicleDetailsInput';
import { CustomFieldInput } from './CustomFieldInput/CustomFieldInput';

export const VehicleDetails = () => {
  // Utility fields that shouldn't be shown
  const hiddenInfoFields = [ 'userId', 'image', '__v', '_id' ];
  const defaultFields = [ 'brand', 'type', 'model', 'modification' ];

  const vehicleInfo = useSelector(state => state.vehicle.info);

  return (
    <div className="details-wrapper">
      <h1 className="details-header">Vehicle details</h1>
      <div className="details">
        { Object.keys(vehicleInfo).map((fieldName, index) => {
          // Check if this field should be shown or not
          if (!hiddenInfoFields.includes(fieldName)) {
            return (
              <div key={ fieldName } className="details-field">
                <div className="field-name">{ fieldName } :</div>
                <VehicleDetailsInput
                  value={ vehicleInfo[fieldName] }
                  fieldName={ fieldName }
                  defaultFields={ defaultFields }
                />
              </div>);
          }
          return null;
        }) }
        <CustomFieldInput/>
      </div>
    </div>
  );
};