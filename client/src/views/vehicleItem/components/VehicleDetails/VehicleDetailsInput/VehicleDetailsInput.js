import './style.scss';

import OkIcon from '../../../../../assets/icons/ok-circled-black.svg';
import { useState } from 'react';

export const VehicleDetailsInput = (props) => {
  const [ editable, setEditable ] = useState(false);
  const [ value, setValue ] = useState(props.value);

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    setEditable(false);
    props.updateValue(value);
  }

  return (
    <div>
      { editable
        ? (
          <form className="vehicle-info-input-wrapper" onSubmit={ handleSubmit }>
            <input className="vehicle-info-input"
                   onChange={ handleInputChange }
                   onBlur={ handleSubmit }
                   value={ value }
                   autoFocus
            />
            <button className="submit-button">
              <img className="ok-icon" src={ OkIcon } alt="ok-icon"/>
            </button>
          </form>)
        : (
          <div className="field-value" onClick={ () => setEditable(true) }>
            { value || ' No Value Provided ' }
          </div>) }
    </div>
  );

};