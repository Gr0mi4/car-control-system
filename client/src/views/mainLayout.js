import {Switch, Route} from "react-router-dom"
import AuthPage from "./authPage";
import MainScreen from "./mainScreen/mainScreen";

export const MainLayout = () => {
  return (
    <Switch>
      <Route path="/auth">
        <AuthPage/>
      </Route>
      <Route path="/home">
        <MainScreen/>
      </Route>
    </Switch>
  )
}

export default MainLayout
