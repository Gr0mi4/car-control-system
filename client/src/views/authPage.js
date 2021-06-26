import {useHttp} from "../hooks/http.hook";
import {useState} from "react";
import {Redirect} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {setUser} from "../store/reducers/userSlice";

export const AuthPage = () => {
  const [username, setUsername] = useState('Incognito')
  const [result, setResult] = useState(null)
  const {request} = useHttp()
  const dispatch = useDispatch()

  const usernameChangeHandler = event => {
    setResult(null)
    setUsername(event.target.value)
  }

  const onSubmit = async (evt) => {
    evt.preventDefault()
    await request('/api/auth/check', 'POST', {username})
      .then(res => {
        dispatch(setUser({name: username, id: JSON.parse(res).id }))
        console.log(JSON.parse(res))
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
      <h1>Please enter your name</h1>
      <form onSubmit={onSubmit}>
        <input
          value={username} onChange={usernameChangeHandler}
          placeholder="Please enter your name"
          type="text"/>
        <button type='submit'>Proceed</button>
      </form>
      <h2>{result}</h2>
      {(result === 'User Found' || result === 'User Created') &&
      <Redirect to="/home/"/>
      }
      {result === 'No such user' &&
      <div>
        <h3>Do you want to create user with name {username}?</h3>
        <button onClick={createUser}>Yes</button>
        <button>No</button>
      </div>
      }
    </div>
  )
}

export default AuthPage

