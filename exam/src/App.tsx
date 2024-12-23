import { HashRouter} from 'react-router-dom';
import './App.scss'
import { MainPage } from './pages/MainPage/MainPage';

function App() {

  return (
      <HashRouter>
        <MainPage />
      </HashRouter>
  )
}

export default App
