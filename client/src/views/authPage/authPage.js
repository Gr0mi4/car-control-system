import {useHttp} from "../../hooks/http.hook";

import {useState, useEffect, useRef} from "react";

import {Redirect} from 'react-router-dom'

import {useDispatch} from "react-redux";

import {setUser} from "../../store/reducers/userSlice";

import {ArrowForward} from "@material-ui/icons";

import './style.scss'

export const AuthPage = () => {
  const [username, setUsername] = useState('Incognito')
  const [result, setResult] = useState(null)
  const inputFormRef = useRef(null)
  const {request} = useHttp()
  const dispatch = useDispatch()

  const usernameChangeHandler = event => {
    setResult(null)
    inputFormRef.current.style.marginTop = '200px'
    setUsername(event.target.value)
  }

  const onSubmit = async (evt) => {
    evt.preventDefault()
    await request('/api/auth/check', 'POST', {username})
      .then(res => {
        dispatch(setUser({name: username, id: JSON.parse(res).id}))
        if (JSON.parse(res).message === 'No such user') {
          inputFormRef.current.style.marginTop = '42px'
        }
        setResult(JSON.parse(res).message)
      })
  }

  const createUser = async () => {
    await request('/api/auth/register', 'POST', {username})
      .then(res => {
        setResult(JSON.parse(res).message)
      })
  }

  return (
    <div>
      <div className='main-title-block'>
        <h1 className='main-title'>Welcome to VCS Vehicle Control System!</h1>
        <h3 className='secondary-title'>Here you can manage all your vehicles in one place</h3>
      </div>
      <form className='input-form' onSubmit={onSubmit} ref={inputFormRef}>
        <label className='input-form-label'>Please type User name to proceed</label>
        <div className='action-block'>
          <input
            className='user-name-input'
            value={username}
            onChange={usernameChangeHandler}
            placeholder="Please enter your name"
            type="text"/>
          <button className='proceed-button'><ArrowForward fontSize='large'/></button>
        </div>
      </form>
      {(result === 'User Found' || result === 'User Created') &&
      <Redirect to="/home/"/>
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
    </div>
  )
}

export default AuthPage

