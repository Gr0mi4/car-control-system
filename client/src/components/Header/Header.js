import {useSelector} from "react-redux";
import './Header.scss'
import {useAuth} from "../../hooks/auth.hook";
import {setUser} from "../../store/reducers/userSlice";
import {useDispatch} from "react-redux";
import LogoutIcon from './../../assets/icons/logout.png'
import BackIcon from './../../assets/icons/back.png'

export const Header = () => {
  const user = useSelector(state => state.user.value.name)
  const {logout} = useAuth()

  const dispatch = useDispatch()

  function handleLogout () {
    dispatch(setUser({name: null, id: null}))
    logout()
  }

  function handleHigherPage() {

  }


  return (
    <div className='header'>
      <p className='username'>Username: <span className='login'>{user}</span></p>
      <div className='button-block'>
        <button className='back button' onClick={handleHigherPage}>
          <img className='back-icon' src={BackIcon} alt='back-icon'/>
        </button>
        <button className='exit button' onClick={handleLogout}>
          <img className='logout-icon' src={LogoutIcon} alt='logout-icon'/>
          Logout
        </button>
      </div>
    </div>
  )
}
