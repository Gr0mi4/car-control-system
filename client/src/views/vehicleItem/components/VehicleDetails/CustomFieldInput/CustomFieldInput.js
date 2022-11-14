import './style.scss';

import OkIcon from '../../../../../assets/icons/ok-circled-black.svg';
import { useState } from 'react';

export const CustomFieldInput = (props) => {
  const [ inputVisible, setInputVisible ] = useState(false);
  const [ fieldName, setFieldName ] = useState('');
  const [ fieldValue, setFieldValue ] = useState('');
  const [ errorVisible, setErrorVisible ] = useState(false);
  const [ errorText, setErrorText ] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    if (fieldName === '' || fieldValue === '') {
      setErrorVisible(true);
      setErrorText('Fields can\'t be empty');
    } else {
      setErrorVisible(false);
      setErrorText('');
      setInputVisible(false);
      props.updateVehicleInfo(fieldName, fieldValue);
      setFieldName('');
      setFieldValue('');
    }
  }

  return (
    <div>
      { inputVisible &&
        <form className="custom-field-wrapper" onSubmit={ handleSubmit }>
          <input className="vehicle-info-input" onChange={ (evt) => setFieldName(evt.target.value) }/> :
          <input className="vehicle-info-input" onChange={ (evt) => setFieldValue(evt.target.value) }/>
          <button className="submit icon-button" onClick={ handleSubmit }>
            <img className="ok-icon" src={ OkIcon } alt="ok"/>
          </button>
          { errorVisible && <span className="error">{ errorText }</span> }
        </form>
      }
      <button
        className={ inputVisible ? 'color-red show-input button' : 'color-blue show-input button' }
        onClick={ () => setInputVisible(!inputVisible) }
      >
        { inputVisible ? 'Do not add custom field' : 'Add custom field' }
      </button>
    </div>
  );
};