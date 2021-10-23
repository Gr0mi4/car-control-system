import {useSelector} from "react-redux";
import {Link} from 'react-router-dom'

import {VehicleItem} from "./Vehicle Item/VehicleItem"

import './style.scss'

export const VehicleList = () => {
  const vehicleList = useSelector(state => state.vehicleList.value)

  const vehicleListMap = vehicleList.map((item, index) =>
    <Link to={`/vehicle/${item._id}`} className='vehicle-card' key={index} children={VehicleItem}>
      {item.brand} {item.model}
    </Link>)
  return (
    <div className='vehicle-list'>
      {vehicleListMap}
    </div>
  )
}
