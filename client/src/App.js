import './App.css';
import 'fontsource-roboto'
import '@fontsource/montserrat'
import MainLayout from './views/mainLayout';
import { BrowserRouter } from 'react-router-dom';


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
