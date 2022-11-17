import './App.css';
import 'fontsource-roboto';
import '@fontsource/montserrat/100.css';
import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import MainLayout from './views/mainLayout';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App" id="app">
        <MainLayout></MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
