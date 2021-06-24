import {useHttp} from "../hooks/http.hook";
import {useEffect} from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {setUser} from "../store/reducer";


export const MainScreen = () => {
  const {request} = useHttp()
  const [showNewVehicleModal, setShowNewVehicleModal] = useState(false)
  const user = useSelector(state => state.user.value.name)
  const userId = useSelector(state => state.user.value.id)

  function handleAddNewVehicleClick () {
    setShowNewVehicleModal(true)
  }

  function closeAddNewVehicleModal () {
    setShowNewVehicleModal(false)
  }

  const getUserVehicles = async () => {
    try {
      const data = await request('/api/auth/getUserVehicles', 'POST', {userId})
        .then(res => {
          console.log('dataVehicles', JSON.parse(res))
        })
    } catch (e) {

    }
  }

  useEffect(() => {getUserVehicles()}, [])

  function saveNewVehicle() {
    console.log('save new vehicle')
  }

  // const vehicleList = user.vehicles.map((item, index) => <li key={index}>{item.name}</li>)
  return (
    <div>
      <h1>Welcome to your Garage {user}! Your id is {userId}</h1>
      <h2>Choose your vehicle or add new one</h2>
      <button onClick={handleAddNewVehicleClick}>+</button>
      <Dialog open={showNewVehicleModal} onClose={closeAddNewVehicleModal}>
        <DialogTitle>Here you can add new vehicle</DialogTitle>
        <DialogContent dividers>
            <form onSubmit={saveNewVehicle}>
              <TextField required label="Brand"/>
              <TextField required label="Model"/>
              <TextField required label="Complectation"/>
              <TextField required label="Type"/>
            </form>
        </DialogContent>
        <Button onClick={saveNewVehicle}>Save Vehicle</Button>
        <Button onClick={closeAddNewVehicleModal}>Cancel</Button>
      </Dialog>
    </div>
  )
}

export default MainScreen
