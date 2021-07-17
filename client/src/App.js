import './App.css';
import 'fontsource-roboto'
import 'typeface-montserrat'
import MainLayout from "./views/mainLayout";
import {BrowserRouter} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainLayout></MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
