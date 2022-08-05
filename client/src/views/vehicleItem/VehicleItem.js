import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useHttp } from '../../hooks/http.hook';

import './style.scss'
import OkIcon from '../../assets/icons/ok-circled.svg';
import PlusCircled from '../../assets/icons/plus-circled.svg'

export const VehicleItem = () => {
  const {id} = useParams();
  const [vehicleInfo, setVehicleInfo] = useState({})
  const [changingValue, setNewValue] = useState('')

  const {request} = useHttp()

  // Utility fields that shouldn't be shown
  const hiddenInfoFields = ['userId', 'image', '__v', '_id']

  function parseResults(results) {
    // Needed for text/input feature to work. Adding to every value prop that decides what to show input or text
    const values = Object.values(results);
    const keys = Object.keys(results);
    const parsedResults = {};

    keys.map((key, index) => {
      // Checks if we need isChanging prop for particular value (we won't be changing service fields, img and etc)
      if (!hiddenInfoFields.includes(key)) {
        return parsedResults[key] = {value: values[index], isChanging: false}
      } else {
        return parsedResults[key] = values[index]
      }
    })
    return parsedResults;
  }

  async function getVehicleInfo() {
    try {
      await request('/api/vehicle/getVehicleInfo', 'POST', {vehicleId: id})
        .then(res => {
          const results = JSON.parse(res)
          setVehicleInfo(parseResults(results))
        })
    } catch (e) {

    }
  }

  async function updateVehicleInfo(fieldName) {
    try {
      await request('/api/vehicle/changeVehicleProp', 'PATCH', {
        vehicleId: id, newValue: changingValue, updatedField: fieldName,
      })
        .then(res => {
          const results = JSON.parse(res)
          setVehicleInfo(parseResults(results))
        })
    } catch (e) {

    }
  }

  useEffect(() => {
    getVehicleInfo()
  }, [])

  function handleInputChange(event) {
    let value = event.target.value;
    const fieldName = event.target.name;

    const updatedVehicleInfo = {...vehicleInfo}
    updatedVehicleInfo[fieldName].value = value
    setVehicleInfo(updatedVehicleInfo)

    setNewValue(value)
  }

  function handleSendData(fieldName) {
    return async (event) => {
      event.preventDefault()
      await updateVehicleInfo(fieldName)
    }
  }

  function showInput(fieldName) {
    return () => {
      const updatedVehicleInfo = {...vehicleInfo}
      updatedVehicleInfo[fieldName].isChanging = true
      setVehicleInfo(updatedVehicleInfo)
    }
  }

  function handleBlur(event) {
    const fieldName = event.target.name
    const updatedVehicleInfo = {...vehicleInfo}
    updatedVehicleInfo[fieldName].isChanging = false
    setVehicleInfo(updatedVehicleInfo)
  }

  function handleInputFocus(event) {
    setNewValue(event.target.value)
  }

  return (
    <div className="vehicle-info-wrapper">
      {vehicleInfo.image && <img className="main-image" src={vehicleInfo.image} width="400" alt="Vehicle Image"/>}
      {!vehicleInfo.image &&
      <div className="no-image-plug">
        <div className="plug-text">
          <p>No photo</p>
          <p>Want to add one?</p>
        </div>
        <button className="img-add-button">
          <img className="plus-circled" src={PlusCircled} alt="plus-circled"/>
        </button>
      </div>}

      <div className="details-wrapper">
        <div className="details-header">Vehicle details</div>
        {Object.keys(vehicleInfo).map(fieldName => {
          // Check if this field should be shown or not
          if (!hiddenInfoFields.includes(fieldName)) {
            return (
              <div key={fieldName} className="details-field">
                <div className="field-name">{fieldName} :</div>
                {vehicleInfo[fieldName].isChanging
                  ?
                  (<form className="vehicle-info-input-wrapper">
                    <input className="vehicle-info-input"
                           type="text"
                           onChange={handleInputChange}
                           onFocus={handleInputFocus}
                           onBlur={handleBlur}
                           name={fieldName}
                           value={vehicleInfo[fieldName].value}
                           autoFocus
                    />
                    <button className="submit-button" onClick={handleSendData(fieldName)}>
                      <img className="ok-icon" src={OkIcon} alt="ok-icon"/>
                    </button>
                  </form>)
                  :
                  (<div
                    className="field-value"
                    onClick={showInput(fieldName)}>
                    {vehicleInfo[fieldName].value ? vehicleInfo[fieldName].value : ' No Value Provided '}
                  </div>)
                }
              </div>
            )
          }
        })}
      </div>

      <button className="add-property button">+</button>
    </div>
  )
}