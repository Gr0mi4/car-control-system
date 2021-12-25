import {useSelector} from "react-redux";
import {Link} from 'react-router-dom'

import {VehicleItem} from "./Vehicle Item/VehicleItem"

import WhiteSpace from './../../../assets/icons/logout.svg'

import './style.scss'

export const VehicleList = () => {
  const vehicleList = useSelector(state => state.vehicleList.value)

  const vehicleListMap = vehicleList.map((item, index) =>
    <Link
        to={`/vehicle/${item._id}`}
        key={index}
        className='vehicle-card'
        children={VehicleItem}>
    <img className='main-image' src={WhiteSpace} alt='vehicle-img' />
    <div className='vehicle-details'>
      <p>Name: {item.brand} {item.model}</p>
      <p>Type: {item.type}</p>
      <p>Year: </p>
      <p>Status:</p>
    </div>
    </Link>)
  return (
    <div className='vehicle-list'>
      {vehicleListMap}
    </div>
  )
}
