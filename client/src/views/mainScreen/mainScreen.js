import {useHttp} from "../../hooks/http.hook";

import {Redirect} from 'react-router-dom'

import {useEffect} from "react";
import {useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {setVehicleList} from "../../store/reducers/vehicleListSlice";
import {AddNewVehicleModal} from "../../components/mainScreen/AddNewVehicleModal/AddNewVehicleModal";
import {Header} from "../../components/Header/Header";
import {VehicleList} from "../../components/mainScreen/VehicleList/VehicleList";

import {Button} from "@material-ui/core";

import './style.scss'


export const MainScreen = () => {
  const [showAddNewVehicleModal, setAddShowNewVehicleModal] = useState(false)

  const userId = useSelector(state => state.user.value.id)
  const vehicleList = useSelector(state => state.vehicleList.value)

  const {request} = useHttp()
  const dispatch = useDispatch()

  function handleAddNewVehicleClick () {
    setAddShowNewVehicleModal(true)
  }

  function closeAddNewVehicleModal () {
    setAddShowNewVehicleModal(false)
  }

  const saveNewVehicle = async (brand, model, modification, type) => {
    try {
      await request('/api/vehicle/saveNewVehicle', 'POST', {userId, brand, model, modification, type})
        .then(() => {
          closeAddNewVehicleModal()
          getUserVehicles()
        })
    } catch (e) {
      console.log(e)
    }
  }

  const getUserVehicles = async () => {
    try {
      await request('/api/vehicle/getUserVehicles', 'POST', {userId})
        .then(res => {
          const results = JSON.parse(res)
          dispatch(setVehicleList(results))
        })
    } catch (e) {

    }
  }

  useEffect(() => {
    getUserVehicles()
  }, [])

  return (
    <div>
      {!userId && <Redirect to="/auth" />}
      <Header/>
      <h2>Choose your vehicle or add new one</h2>
        {vehicleList.length > 0 && <VehicleList/>}
      <Button
        className='add-vehicle-button'
        variant='outlined'
        color='primary' onClick={handleAddNewVehicleClick}>
        Add new Vehicle
      </Button>
      <AddNewVehicleModal
          showNewVehicleModal={showAddNewVehicleModal}
          closeAddNewVehicleModal={closeAddNewVehicleModal}
          saveNewVehicle={saveNewVehicle}
      />
    </div>
  )
}

export default MainScreen
