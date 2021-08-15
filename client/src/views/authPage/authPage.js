import {useHttp} from "../../hooks/http.hook";
import {useAuth} from "../../hooks/auth.hook";

import {useState, useEffect} from "react";

import {Redirect} from 'react-router-dom'

import {useDispatch} from "react-redux";

import {setUser} from "../../store/reducers/userSlice";

import {InputForm} from './components/InputForm/InputForm'

import {loginValidation, passwordValidation} from "./utils/validation";

import './style.scss'

export const AuthPage = () => {
  const [username, setUsername] = useState('Incognito')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(null)

  const {request, error, setError} = useHttp()
  const dispatch = useDispatch()

  const {login} = useAuth()


  const checkIfUserIsLoggedIn = function () {
    const storageName = 'userData'
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      setResult('User Found')
      dispatch(setUser({name: data.username, id: data.id}))
    }
  }

  const usernameChangeHandler = event => {
    setResult(null)
    setUsername(event.target.value)
  }

  const passwordChangeHandler = event => {
    setResult(null)
    setPassword(event.target.value)
  }

  useEffect(() => {
    checkIfUserIsLoggedIn()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!loginValidation(username) && !passwordValidation(password)) {
      await request('/api/auth/check', 'POST', {username, password})
        .then(res => {
          const result = JSON.parse(res)
          dispatch(setUser({name: username, id: result.id}))
          login(result.token, result.id, result.username)
          setResult(JSON.parse(res).message)
        })
        .catch(err => {
        })
    } else {
      loginValidation(username) ? setError(loginValidation(username)) : setError(passwordValidation(password))
    }
  }

  const createUser = async () => {
    await request('/api/auth/register', 'POST', {username, password, id: Math.random()})
      .then(res => {
        const result = JSON.parse(res)
        dispatch(setUser({name: result.username, id: result.id}))
        login(result.token, result.id, result.username)
      })
      .then(() => {
        setResult('User Created')
      })
  }

  return (
    <div>
      <div className='main-title-block'>
        <h1 className='main-title'>Welcome to VCS Vehicle Control System!</h1>
        <h3 className='secondary-title'>Here you can manage all your vehicles in one place</h3>
      </div>
      <section className='action-block'>
      <InputForm
        handleSendForm={handleLogin}
        handleUsernameChange={usernameChangeHandler}
        handlePasswordChange={passwordChangeHandler}
        error={error}
      />
      {(result === 'User Found' || result === 'User Created') &&
      <Redirect to="/mainScreen/"/>
      }
      {result === 'No such user' &&
      <div className='create-user-block'>
        <h3 className='no-such-user-title'>
          Sorry, we don’t have user with such name in our database.
          Create it, or choose another one
        </h3>
        <button className='create-user-button' onClick={createUser}>Create User</button>
      </div>
      }
      </section>
    </div>
  )
}

export default AuthPage

