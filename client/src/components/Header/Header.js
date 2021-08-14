import {useSelector} from "react-redux";
import './Header.scss'
import {Button} from "@material-ui/core";
import {useAuth} from "../../hooks/auth.hook";
import {setUser} from "../../store/reducers/userSlice";
import {useDispatch} from "react-redux";

export const Header = () => {
  const user = useSelector(state => state.user.value.name)
  const {logout} = useAuth()

  const dispatch = useDispatch()

  function handleLogout () {
    dispatch(setUser({name: null, id: null}))
    logout()
  }

  return (
    <div className='header'>
      <p className='username'>Hello {user}!</p>
      <Button variant='contained' color='primary' className='exit-button' onClick={handleLogout}>Exit</Button>
    </div>
  )
}
