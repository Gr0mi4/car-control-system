import {useSelector} from "react-redux";
import mainLogo from '../../assets/icons/mainLogo.png'
import './Header.scss'
import {Button} from "@material-ui/core";

export const Header = () => {
  const user = useSelector(state => state.user.value.name)

  return (
    <div className='header'>
      <img className='main-logo' src={mainLogo} alt='logo'/>
      <h1 className='username'>Hello {user}</h1>
      <Button variant='contained' color='primary' className='exit-button'>Exit</Button>
    </div>
  )
}
