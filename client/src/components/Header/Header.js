import {useSelector} from "react-redux";
import './Header.scss'
import {Button} from "@material-ui/core";

export const Header = () => {
  const user = useSelector(state => state.user.value.name)

  return (
    <div className='header'>
      <p className='username'>Hello {user}!</p>
      <Button variant='contained' color='primary' className='exit-button'>Exit</Button>
    </div>
  )
}
