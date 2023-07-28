import './style.scss';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateVehicleInfo } from '../../../../../store/dispatchers/vehicle';

import OkIcon from '../../../../../assets/icons/ok-circled-black.svg';

export const CustomFieldInput = () => {
  const [ inputVisible, setInputVisible ] = useState(false);
  const [ fieldName, setFieldName ] = useState('');
  const [ value, setValue ] = useState('');
  const [ errorVisible, setErrorVisible ] = useState(false);
  const [ errorText, setErrorText ] = useState('');

  const dispatch = useDispatch();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (fieldName === '' || value === '') {
      setErrorVisible(true);
      setErrorText('Fields can\'t be empty');
    } else {
      setErrorVisible(false);
      setErrorText('');
      setInputVisible(false);
      dispatch(updateVehicleInfo(fieldName, value));
      setFieldName('');
      setValue('');
    }
  }

  return (
    <div>
      { inputVisible &&
        <form className="custom-field-wrapper" onSubmit={ handleSubmit }>
          <input className="vehicle-info-input" onChange={ (evt) => setFieldName(evt.target.value) }/> :
          <input className="vehicle-info-input" onChange={ (evt) => setValue(evt.target.value) }/>
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