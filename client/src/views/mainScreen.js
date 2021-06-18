// import {useHttp} from "../hooks/http.hook";
// import {useEffect} from "react";
// import {useSelector} from "react-redux";


export const MainScreen = () => {
  // const {request} = useHttp()
  // const user = useSelector(state => state.counter.value)

  // const getUser = async () => {
  //   try {
  //     const data = await request('/api/auth/getUser', 'GET',)
  //     setUser(JSON.parse(data))
  //   } catch (e) {}
  // }

  // useEffect(() => {
  //   // getUser()
  // }, [])

  // const vehicleList = user.vehicles.map((item, index) => <li key={index}>{item.name}</li>)
  return (
    <div>
      <h1>Welcome to your Garage !</h1>
      <h2>Choose your vehicle or add new one</h2>
      <button>+</button>
    </div>
  )
}

export default MainScreen
