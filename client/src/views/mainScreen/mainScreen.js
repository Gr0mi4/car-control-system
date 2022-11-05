import './style.scss'

import {useHttp} from '../../hooks/http.hook';

import {Redirect} from 'react-router-dom'

import {useEffect} from 'react';
import {useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';

import {setVehicleList} from '../../store/reducers/vehicleListSlice';

import PlusIcon from '../../assets/icons/plus.png'

import {VehicleList} from './components/VehicleList/VehicleList';
import {AddVehicleModal} from './components/AddVehicleModal/AddVehicleModal';


export const MainScreen = () => {
    const [showAddNewVehicleModal, setAddShowNewVehicleModal] = useState(false)

    const userId = useSelector(state => state.user.value.id)
    const vehicleList = useSelector(state => state.vehicleList.value)

    const {request} = useHttp()
    const dispatch = useDispatch()

    function handleAddNewVehicleClick() {
        setAddShowNewVehicleModal(true)
    }

    function closeAddNewVehicleModal() {
        setAddShowNewVehicleModal(false)
    }

    const saveNewVehicle = async (brand, model, modification, type, image) => {
        try {
            await request('/api/vehicle/saveNewVehicle', 'POST', {userId, brand, model, modification, type, image})
                .then(() => {
                    closeAddNewVehicleModal()
                    getUserVehicles()
                })
        } catch (e) {
            console.warn(e)
        }
    }

    const getUserVehicles = async () => {
        if (userId) {
            try {
                await request('/api/vehicle/getUserVehicles', 'POST', {userId})
                    .then(res => {
                        const results = JSON.parse(res)
                        dispatch(setVehicleList(results))
                    })
            } catch (e) {
                console.warn('Something went wrong', e.text)
            }
        }
    }

    useEffect(() => {
        getUserVehicles()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="main-screen">
            {!userId && <Redirect to="/auth"/>}
            <section className="main-section">
                <h1 className="title">Chose vehicle you want to work with</h1>
                {vehicleList.length > 0 && <VehicleList/>}
            </section>
            <section className="footer-section">
                <button id="Add" className="add-vehicle button" onClick={handleAddNewVehicleClick}>
                    <img src={PlusIcon} className="plus icon" alt="plus"/>
                </button>
                <label htmlFor="Add" className="add-label">Add New Vehicle</label>
            </section>
            <AddVehicleModal
                show={showAddNewVehicleModal}
                onClose={closeAddNewVehicleModal}
                onSave={saveNewVehicle}
            />
        </div>
    )
}

export default MainScreen
