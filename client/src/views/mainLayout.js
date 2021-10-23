import {Switch, Route} from "react-router-dom"
import AuthPage from "./authPage/authPage";
import MainScreen from "./mainScreen/mainScreen";
import { useEffect } from "react";

export const MainLayout = () => {
    function redirect() {
        if (window.location.href === 'http://localhost:3000/') {
            window.location.href = 'http://localhost:3000/auth';
        }
    }

    useEffect(() => {
        redirect()
    }, [])


    return (
    <Switch>
      <Route path="/auth">
        <AuthPage/>
      </Route>
      <Route path="/mainScreen">
        <MainScreen/>
      </Route>
    </Switch>
  )
}

export default MainLayout
