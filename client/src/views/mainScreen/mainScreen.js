import {useHttp} from "../../hooks/http.hook";

import {Redirect} from 'react-router-dom'

import {useEffect} from "react";
import {useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {setVehicleList} from "../../store/reducers/vehicleListSlice";

import {AddNewVehicleModal} from "../../components/mainScreen/AddNewVehicleModal/AddNewVehicleModal";
import {VehicleList} from "../../components/mainScreen/VehicleList/VehicleList";

import PlusIcon from "../../assets/icons/plus.png"

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
    <div className='main-screen'>
      {!userId && <Redirect to="/auth" />}
        <section className='main-section'>
            <h1 className='title'>Chose vehicle you want to work with</h1>
            {vehicleList.length > 0 && <VehicleList />}
        </section>
        <section className='footer-section'>
            <button className='add-vehicle button' onClick={handleAddNewVehicleClick}>
                <img src={PlusIcon} className='plus icon' alt='plus icon'/>
            </button>
            <label className='add-label'>Add New Vehicle</label>
        </section>
      <AddNewVehicleModal
          showNewVehicleModal={showAddNewVehicleModal}
          closeAddNewVehicleModal={closeAddNewVehicleModal}
          saveNewVehicle={saveNewVehicle}
      />
    </div>
  )
}

export default MainScreen
