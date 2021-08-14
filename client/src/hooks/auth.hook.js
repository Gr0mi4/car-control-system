import {useState, useCallback} from "react";

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [id, setId] = useState(null)

  const login = useCallback((jwtToken, id, username) => {
    setToken(jwtToken)
    setId(id)

    localStorage.setItem(storageName, JSON.stringify({id: id, token: jwtToken, username}))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setId(null)
    localStorage.removeItem(storageName)
  }, [])

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem(storageName))
  //   console.log('auth gook')
  //
  //   if (data && data.token) {
  //     login(data.token, data.id)
  //   }
  // }, [login])

  return {login, logout, token, id}
}
