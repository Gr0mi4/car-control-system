import {useHttp} from "../hooks/http.hook";
import {useEffect} from "react";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setVehicleList} from "../store/reducers/vehicleListSlice";
import {AddNewVehicleModal} from "../components/mainScreen/AddNewVehicleModal";


export const MainScreen = () => {
  const {request} = useHttp()
  const [showAddNewVehicleModal, setAddShowNewVehicleModal] = useState(false)
  const user = useSelector(state => state.user.value.name)
  const userId = useSelector(state => state.user.value.id)
  const vehicleList = useSelector(state => state.vehicleList.value)
  const dispatch = useDispatch()

  function handleAddNewVehicleClick () {
    setAddShowNewVehicleModal(true)
  }

  function closeAddNewVehicleModal () {
    setAddShowNewVehicleModal(false)
  }

  const getUserVehicles = async () => {
    try {
      await request('/api/auth/getUserVehicles', 'POST', {userId})
        .then(res => {
          const results = JSON.parse(res)
          dispatch(setVehicleList(results))
          console.log('dataVehicles', results, vehicleList)
        })
    } catch (e) {

    }
  }

  useEffect(() => {
    getUserVehicles()
  }, [])

  const vehicleListMap = vehicleList.map((item, index) =>
      <li key={index}>{item.brand} {item.model}</li>)
  return (
    <div>
      <h1>Welcome to your Garage {user}!</h1>
      <h2>Choose your vehicle or add new one</h2>
        {vehicleList.length > 0 &&
        <ul>
            {vehicleListMap}
        </ul>}
      <button onClick={handleAddNewVehicleClick}>+</button>
      <AddNewVehicleModal
          showNewVehicleModal={showAddNewVehicleModal}
          closeAddNewVehicleModal={closeAddNewVehicleModal}
      />
    </div>
  )
}

export default MainScreen
