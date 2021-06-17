import {useHttp} from "../hooks/http.hook";
import {useState} from "react";

export const AuthPage = () => {
  const [username, setUsername] = useState('Incognito')
  const [result, setResult] = useState(null)
  const {request} = useHttp()

  const usernameChangeHandler = event => {
    // setResult(null)
    setUsername(event.target.value)
  }

  const onSubmit = async (evt) => {
    evt.preventDefault()
    console.log(username)
    await request('/api/auth/check', 'POST', {username})
      .then(res => {
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

