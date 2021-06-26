import {useSelector} from "react-redux";
import {Card, CardContent} from "@material-ui/core";
import './style.scss'

export const VehicleList = () => {
  const vehicleList = useSelector(state => state.vehicleList.value)

  const vehicleListMap = vehicleList.map((item, index) =>
    <Card className='vehicle-card' key={index}>
      <CardContent>
      {item.brand} {item.model}
      </CardContent>
    </Card>)
  return (
    <div className='vehicle-list'>
      {vehicleListMap}
    </div>
  )
}
