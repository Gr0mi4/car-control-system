import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

import './style.scss'
import OkIcon from '../../assets/icons/ok-circled.svg';

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
        return parsedResults[key] = {value: values[index], isChanging: values[index] === ''}
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
    const target = event.target;
    const value = target.value;

    setNewValue(value)
  }

  async function handleSendData(event) {
    await updateVehicleInfo(event.target.name)
  }

  function showInput(event) {
    const fieldName = event.target.id
    const updatedVehicleInfo = {...vehicleInfo}
    updatedVehicleInfo[fieldName].isChanging = !vehicleInfo[fieldName].isChanging
    setVehicleInfo(updatedVehicleInfo)
  }

  return (
    <div className="vehicle-info-wrapper">
      {vehicleInfo.image && <img className="main-image" src={vehicleInfo.image} width="400" alt="Vehicle Image"/>}
      {!vehicleInfo.image && <div className="no-image-plug"><p>No photo</p></div>}

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
                  (<div className="vehicle-info-input-wrapper">
                    <input className="vehicle-info-input"
                           type="text"
                           onChange={handleInputChange}
                    />
                    <button className="submit-button" name={fieldName} onClick={handleSendData}>
                      <img className="ok-icon" src={OkIcon} alt="ok-icon" name={fieldName}/>
                    </button>
                  </div>)
                  :
                  (<div
                    id={fieldName}
                    className="field-value"
                    onClick={showInput}>
                    {vehicleInfo[fieldName].value}
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