// import {useHttp} from "../hooks/http.hook";
import {useState, useEffect} from "react";
import {} from "react-router-dom"

export const MainScreen = () => {
  // const {request} = useHttp()
  const [user] = useState({username: 'Incognito', vehicles: []})

  // const getUser = async () => {
  //   try {
  //     const data = await request('/api/auth/getUser', 'GET',)
  //     setUser(JSON.parse(data))
  //   } catch (e) {}
  // }

  useEffect(() => {
    // getUser()
  }, [])

  const vehicleList = user.vehicles.map((item, index) => <li key={index}>{item.name}</li>)
  return (
    <div>
      <h1>Welcome to your Garage {user.username}!</h1>
      <h2>Choose your vehicle to proceed</h2>
      <ul>{vehicleList}</ul>
    </div>
  )
}

export default MainScreen
